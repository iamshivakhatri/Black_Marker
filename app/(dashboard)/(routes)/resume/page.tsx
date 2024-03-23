import { Input } from "@/components/ui/input";

const Resume = () => {
    return (  
        <div>
        <h1 className='text-3xl font-bold text-gray-900'>Name</h1>
        <div className='mt-3 flex items-end justify-between'>
            <p className='text-2xl text-gray-900'>
                Hello

            </p>
        </div>
        <hr  className='my-4'/>

        <div className='flex flex-col gap-y-6'>
        <div className='flex items-center gap-x-4 '>
            <h3 className='font-semibold text-black'>Size</h3>
            Hi

        </div>

        <div className='flex items-center gap-x-4 '>
            <h3 className='font-semibold text-black'>Color</h3>
            <div className='h-6 w-6 rounded-full border border-gray-600 ' style={{backgroundColor: "blue"}} />
           
        </div>
        </div>

        <div className='mt-10 flex items-center gap-x-3'>
            <button>
                button
            </button>

        </div>
        
    </div>

    );
}
 
export default Resume;