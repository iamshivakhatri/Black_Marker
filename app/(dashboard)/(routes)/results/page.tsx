"use client";
import React from 'react';
import { useGlobalContext } from '@/context/global-context';

const Results = () => {
    const { userData } = useGlobalContext();

    return (  
        <div>
            <h1>Leaderboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((user, index) => (
                        <tr key={index}>
                            <td>{user.userId}</td>
                            <td>{user.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
 
export default Results;
