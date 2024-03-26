interface ResumeLayoutProps {
    data: {
        name: string;
        email: string;
        // Add more fields as needed
    };
}

const ResumeLayout: React.FC<ResumeLayoutProps> = ({ data }) => {
    return (
        <div className="flex-1">
            <h1>{data.name}</h1>
            <p>{data.email}</p>
            hi
            {/* Render other resume data */}
        </div>
    );
};

export default ResumeLayout;
