// hooks/useTickets.js
import { useState, useEffect } from 'react';
import axios from '../services/axiosInstance';

export const useTickets = (endpoint, shouldFetchUser = true) => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAndTransformTickets = async () => {
            try {
                setLoading(true);
                setError(null);

                let ticketsResponse;

                if (shouldFetchUser) {
                    const userRes = await axios.get("/auth/me", {
                        withCredentials: true,
                        headers: { "Content-Type": "application/json" },
                    });

                    ticketsResponse = await axios.get(
                        `${endpoint}/${userRes.data.id}`,
                        { headers: { 'Content-Type': 'application/json' } }
                    );
                } else {
                    ticketsResponse = await axios.get(endpoint, {
                        headers: { 'Content-Type': 'application/json' }
                    });
                }

                const rawTickets = ticketsResponse.data;

                async function transformTicket(ticket) {
                    try {
                        let userName;
                        if (shouldFetchUser) {
                            const userResponse = await axios.get('/auth/me', {
                                withCredentials: true,
                                headers: { 'Content-Type': 'application/json' },
                            });
                            userName = userResponse.data.userName;
                        } else {
                            userName = (await axios.get(`/api/user/${ticket.createdBy}`)).data.user.userName;
                        }

                        let categoryName;
                        try {
                            const categoryResponse = await axios.get(
                                `/Categories/getCategoryNameById/${ticket.type}`,
                                { headers: { 'Content-Type': 'application/json' } }
                            );
                            categoryName = categoryResponse.data;
                        } catch (categoryError) {
                            console.error('Error fetching category:', categoryError);
                            categoryName = ticket.type || 'לא ידוע';
                        }

                        function formatDateOnly(isoString) {
                            const date = new Date(isoString);
                            return date.toLocaleDateString('he-IL');
                        }

                        return {
                            key: ticket._id,
                            _id: ticket._id,
                            name: userName,
                            category: categoryName,
                            date: formatDateOnly(ticket.createdAt),
                            tags: ticket.priority,
                            status: ticket.status,
                            userId: ticket.userId,
                        };
                    } catch (transformError) {
                        console.error('Error transforming ticket:', transformError, ticket);
                        return {
                            key: ticket._id,
                            _id: ticket._id,
                            name: ticket.userName || ticket.name || `משתמש ${ticket.userId || ticket._id}`,
                            category: ticket.type || 'לא ידוע',
                            date: new Date(ticket.createdAt).toLocaleDateString('he-IL'),
                            tags: ticket.priority,
                            status: ticket.status,
                            userId: ticket.userId,
                        };
                    }
                }

                const transformedTickets = await Promise.all(
                    rawTickets.map(t => transformTicket(t))
                );

                const validTickets = transformedTickets.filter(ticket => ticket !== null);
                setTickets(validTickets);
            } catch (err) {
                console.error('Error fetching tickets:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAndTransformTickets();
    }, [endpoint, shouldFetchUser]);

    return { tickets, loading, error };
};