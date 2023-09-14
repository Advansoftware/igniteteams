import { Header } from "@components/Header";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { HightLight } from "@components/HightLight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { FlatList } from "react-native";
import { useState } from "react";
import { Playercard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

export function Players(){
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers]=useState(['arroz', 'feijao', 'casa', 'rwarw', 'desativer', 'lasad', 'ashasu'])
  return(
    <Container>
      <Header showBackButton/>
      <HightLight
        title="Nome da turma"
        subtitle="Adicione a galera e separe os times"
      />
      <Form>
      <Input
        placeholder="Nome da Pessoa"
        autoCorrect={false}
      />
      <ButtonIcon icon="add"/>
      </Form>
      <HeaderList>
         <FlatList
        data={['Time A', 'Time B']}
        keyExtractor={item=>item}
        renderItem={({item})=>(
          <Filter 
            title={item}
            isActive={item===team}
            onPress={()=>setTeam(item)}
          />
        )}
        horizontal
      />
      <NumberOfPlayers>
        {players.length}
      </NumberOfPlayers>
      </HeaderList>
      <FlatList
        data={players}
        keyExtractor={item=>item}
        renderItem={({item})=>(
          <Playercard 
            name={item} 
            onRemove={()=>{ }}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty
            message="Não há pessoas nesse time"
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          {paddingBottom: 100},
          players.length === 0 && {flex: 1}
        ]}
      />
      <Button title="Remover Turma" type="SECONDARY"/>
    </Container>
  )
}