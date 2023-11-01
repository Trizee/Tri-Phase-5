import { useEffect, useRef } from 'react'

function UploadWidget({setPic,pic}){

    const cloudinaryRef = useRef()
    const widgetRef = useRef()

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'dqnxw66wo',
            uploadPreset: 'Something',
            remove_header: true,
            styles:{
            palette: {
                window: "#90A0B3",
                windowBorder: "#90A0B3",
                tabIcon: "#0E2F5A",
                menuIcons: "#5A616A",
                textDark: "#000000",
                textLight: "#FFFFFF",
                link:  "#0078FF",
                action:  "#FF620C",
                inactiveTabIcon: "#0E2F5A",
                error: "#F44235",
                inProgress: "#0078FF",
                complete: "#20B832",
                sourceBg: "#E4EBF1",
            },
            fonts: {
                "'Cute Font', cursive": "https://fonts.googleapis.com/css?family=Cute+Font",
            }},
        }, function (error,result) {
            if (result.event == "success") {
                setPic(result.info.url)
            }
            else {
                console.log(result)
            }
        })
    }, [])

    return (
        <>
        <div className="avatar w-full justify-center" onClick={()=>widgetRef.current.open()}>
            <div className="w-full rounded-full ring ring-gray-700 ring-offset-base-100 ring-offset-1 hover:ring-gray-500">
                <img src={pic} />
            </div>
        </div>
        </>
    )
}

export default UploadWidget