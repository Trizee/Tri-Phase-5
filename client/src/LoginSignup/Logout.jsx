import { useNavigate } from "react-router-dom"

function LogoutPage(){

    const navigate = useNavigate()

    function refresh(){
        navigate('/')
        navigate(0)
    }

    return (
    <dialog id="my_modal_3" class="modal">
    <div class="modal-box bg-gray-300">
        <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-5 top-5" onClick={()=>refresh()}>✕</button>
        </form>
        <h3 class="font-bold text-lg text-center text-black">SORRY TO SEE YOU GO</h3>
        <p class="py-4 text-center text-black">We appreciate your visit to our website and hope you had a seamless and enjoyable experience exploring our services. As you log out, we want to express our gratitude for choosing our platform. Your privacy and security are of utmost importance to us, and logging out ensures that your account remains protected. If you have any feedback or suggestions, please feel free to reach out to us. We look forward to serving you again in the future. Thank you for being a part of our community, and we wish you a great day</p>
    </div>
    </dialog>
    )
}

export default LogoutPage