import { BlankPageContainer } from './styles'; 
import { Button } from '../../components/OrangeButton/styles';
import Input from '../../components/InputComponent';

export default function BlankPage (){
  return (
    <BlankPageContainer>
     <Button>Teste</Button>
      <Input />
    </BlankPageContainer>
  );
}