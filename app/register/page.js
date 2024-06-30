import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Form from "../../components/register/form";

const Register = async () => {
    const session = await getServerSession();
    if(session){
        redirect('/');
    };

    return (
        <Form />
    );
};

export default Register;