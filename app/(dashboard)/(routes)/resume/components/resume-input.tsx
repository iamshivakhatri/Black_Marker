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
        <div className="h-screen mx-auto overflow-hidden md:w-1/4 ">
            <div className="h-full overflow-y-auto">
                <ResumeForm />
            </div>
        </div>
    );
};

export default ResumeInput;
