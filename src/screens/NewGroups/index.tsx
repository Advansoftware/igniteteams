import { Header } from "@components/Header";
import { Container, Content, Icon } from "./styles";
import { HightLight } from "@components/HightLight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";

export function NewGroups(){
  return(
    <Container>
      <Header showBackButton />
      <Content >
        <Icon />
        <HightLight
          title="Nova Turma"
          subtitle="Crie uma turma para adicionar pessoas" 
        />
        <Input  
          placeholder="Nome da turma"
        />
        <Button 
          title="Criar"
          style={{marginTop: 20}}
        />
      </Content>
    </Container>
  )
}