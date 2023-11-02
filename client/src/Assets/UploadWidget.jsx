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
            // styles:{
            // palette: {
            //     window: "gray",
            //     windowBorder: "black",
            //     tabIcon: "black",
            //     menuIcons: "black",
            //     textDark: "#000000",
            //     textLight: "gray",
            //     link:  "gray",
            //     action:  "black",
            //     inactiveTabIcon: "purple",
            //     error: "#F44235",
            //     inProgress: "#0078FF",
            //     complete: "#20B832",
            //     sourceBg: "#E4EBF1",
            // },
        // },
        }, function (error,result) {
            if (result.event == "success") {
                setPic(result.info.url)
            }
        })
    }, [])

    return (
        <>
        <div className="avatar w-full justify-center" onClick={()=>widgetRef.current.open()}>
            <div className="w-full rounded-full ring ring-gray-700 ring-offset-base-100 ring-offset-1 hover:ring-gray-300">
                <img src={pic} />
            </div>
        </div>
        </>
    )
}

export default UploadWidget