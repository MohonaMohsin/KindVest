import RegisterForm from "../components/RegisterForm.jsx";
import MasterLayout from "../../MasterLayout/MasterLayout.jsx";


const RegisterPage = () => {
    return (
        <div>
            <MasterLayout>
                 <RegisterForm />
            </MasterLayout>
        </div>
    );
};

export default RegisterPage;