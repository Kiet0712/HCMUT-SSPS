export function Welcome () {
    return (
        <div className="w-screen h-screen">
            <div class="flex flex-col justify-center bg-[url('./src/assets/background-homepage.png')] h-dvh w-dvh bg-contain bg-no-repeat">
                <div className="flex flex-row items-center">
                    <div className="flex flex-col items-start m-5 px-5 py-8 rounded-md bg-black/75">         
                            <p className="text-xl text-white m-2">Student Smart Printing System</p>
                            <h1 className="text-4xl font-bold text-white m-2">Welcome Tram!</h1>
                            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300m rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 m-2">Print</button>
                    </div>
                </div>
            </div>
        </div>
        
    )  
}   