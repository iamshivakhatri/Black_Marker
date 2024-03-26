import { ResumeForm } from "./resume-form";


interface ResumeInputProps {
    onChange: (key: string, value: string) => void;
}

const ResumeInput: React.FC<ResumeInputProps> = ({ onChange }) => {
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        onChange(name, value);
    };

    return (
        <div className="flex-1">
            <ResumeForm />
        </div>
    );
};

export default ResumeInput;
