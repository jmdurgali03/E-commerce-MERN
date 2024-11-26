import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWrap";
import NullData from "@/app/components/NullData";
import PromotionsForm from "./AddProm";

const AddProm = async () => {

    const currentUser = await getCurrentUser();

    if(!currentUser || currentUser.role != 'ADMIN'){
        return <NullData title="Oops! Access denied"/>
    }

    return ( 
        <div className="p-4">
            <Container>
                <FormWrap>
                   <PromotionsForm />
                </FormWrap>
            </Container>
        </div>
    );
}
 
export default AddProm;