"use client";
import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '@/context/global-context';
import { useParams, useRouter } from "next/navigation";

// Define the type for the quiz question
type Question = {
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
};

const Quiz = () => {
    // Define quiz questions and answers

    const router = useRouter();
    const questions: Question[] = [
        {
            id: 1,
            question: 'What is the capital of France?',
            options: ['Paris', 'London', 'Berlin', 'Madrid'],
            correctAnswer: 'Paris'
        },
        {
            id: 2,
            question: 'What is the largest planet in our solar system?',
            options: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
            correctAnswer: 'Jupiter'
        },
        // Add more questions as needed
    ];

    // Generate a unique ID for each participant
    const generateUniqueID = (): string => {
        return Math.random().toString(36).substr(2, 9);
    };

    // State to store participant's ID, selected answers, and score
    const { addUserData } = useGlobalContext();
    const [participantID, setParticipantID] = useState<string>('');
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
    const [score, setScore] = useState<number>(0);

    // Effect to generate participant ID on component mount
    useEffect(() => {
        setParticipantID(generateUniqueID());
    }, []);

    // Function to handle answer selection
    const handleAnswerSelection = (questionID: number, selectedOption: string) => {
        setSelectedAnswers({ ...selectedAnswers, [questionID]: selectedOption });
    };

    // Function to calculate the score
    const calculateScore = () => {
        let newScore = 0;
        questions.forEach(question => {
            if (selectedAnswers[question.id] === question.correctAnswer) {
                newScore++;
            }
        });
        setScore(newScore);
        addUserData({ userId: participantID, score: newScore });
        router.push(`/results`)
        router.refresh();
    };

    // Render quiz questions and options
    const renderQuestions = () => {
        return questions.map(question => (
            <div key={question.id} className="mb-4">
                <p>{question.question}</p>
                <div className="grid grid-cols-2 gap-4">
                    {question.options.map(option => (
                        <button
                            key={option}
                            className={`border rounded-md px-4 py-2 ${selectedAnswers[question.id] === option ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => handleAnswerSelection(question.id, option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        ));
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-4">Quiz</h1>
            <p className="mb-4">Take the quiz to test your knowledge</p>
            {/* Participant ID */}
            <p className="mb-4">Your ID: {participantID}</p>
            {/* Quiz Questions */}
            {renderQuestions()}
            {/* Submit button */}
            <button
                className="bg-green-500 text-white rounded-md px-4 py-2"
                onClick={calculateScore}
            >
                Submit Answers
            </button>
            {/* Score */}
            {score > 0 && <p className="mt-4">Your score: {score}</p>}
        </div>
    );
};

export default Quiz;
