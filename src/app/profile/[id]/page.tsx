import {fetchById} from "../../actions";

export default async function Page({params}: {params: {id: string}}) {
    const {id} = params;
    const data = await fetchById({id});

    return (
        //profile page for a user
        <div className="flex flex-col items-center">
            <p>{JSON.stringify(data)}</p>
            <img alt="Profile" className="w-64 h-64 rounded-full object-cover my-8" />
            <h1 className="text-3xl font-bold mb-4">{id}</h1>
            <p className="text-lg text-gray-700 max-w-lg text-center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, sapien vel ultrices
                bibendum</p>
        </div>
    )
}