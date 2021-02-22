import { useContext, useEffect } from 'react'
import { AuthContext } from 'contexts/AuthContext'
import { toast } from 'react-toastify'

const Logout = () => {
    const { handleLogout } = useContext(AuthContext)

    useEffect(() => {
        toast.info('Desconectado com sucesso')
        handleLogout()
    }, [handleLogout])

    return <span>Você está sendo redirecionado para o login...</span>
}

export default Logout
