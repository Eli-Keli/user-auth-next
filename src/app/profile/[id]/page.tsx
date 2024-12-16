export default function UserProfile({params}: unknown) {
    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <h1 className='text-2xl text-center'>Profile Page</h1>
            <hr 
            className='w-1/4 my-4'
            />
            <h2 className='text-xl'>
                Welcome to your profile
                <span className='p-2 ml-2 bg-blue-600 rounded-md'>{params.id}</span>
            </h2>
        </div>
    )
}