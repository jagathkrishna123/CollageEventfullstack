import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Items } from '../../Constants/ProgramData'

const ProgramDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [showDetail, setShowDetail] = useState(null)

    useEffect(() => {
        const selectedItem = Items.find(item => item.id === Number(id))
        setShowDetail(selectedItem)
    }, [id])
    
    return showDetail ? (
    <div className="min-h-screen flex justify-center items-center p-4 bg-black">
        <div className="bg-black shadow-lg rounded-2xl max-w-2xl w-full p-6">
            
            <button 
                onClick={() => navigate(-1)} 
                className="mb-4 text-sm text-blue-600 hover:underline"
            >
                ← Back
            </button>

            <img 
                src={showDetail.image} 
                alt={showDetail.Name} 
                className="w-full h-64 object-cover rounded-xl mb-6 shadow"
            />

            <h1 className="text-2xl font-bold text-gray-800 mb-3">
                {showDetail.Title}
            </h1>

            <p className="text-gray-600 leading-relaxed">
                {showDetail.Description}
            </p>

        </div>
    </div>
) : (
    <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-500 animate-pulse">Loading...</p>
    </div>
)

}

export default ProgramDetails
