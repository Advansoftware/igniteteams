import { Header } from "@components/Header";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { HightLight } from "@components/HightLight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { Alert, FlatList, TextInput } from "react-native";
import { useEffect, useRef, useState } from "react";
import { Playercard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppError } from "@utils/AppErros";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeams";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";
import { Loading } from "@components/Loading";

type RouteParams = {
  group: string;
}

export function Players(){
  const [isLoading, setIsLoading] = useState(true);
  const [team, setTeam] = useState('Time A');
  const [newPlayerName, setNewPlayerName] = useState('');
  const [players, setPlayers]=useState<PlayerStorageDTO[]>([])
  const navigation = useNavigation();
  const route = useRoute();
  const { group } = route.params as RouteParams;

  const newPlayerNameInputRef = useRef<TextInput>(null);

  async function handleAddPlayer() {
    if(newPlayerName.trim().length=== 0){
      return Alert.alert('Nova pessoa', 'informe o nome da pessoa');
    }
    const newPlayer = {
      name: newPlayerName,
      team,
    }
    try {
      await playerAddByGroup(newPlayer, group);
      newPlayerNameInputRef.current?.blur();
      setNewPlayerName('');
      fetchPlayersByTeam();
    } catch (error) {
      if(error instanceof AppError){
        Alert.alert('Nova pessoa', error.message)
      }else{
        Alert.alert('Nova pessoa', 'nao é possivel adicionar')
      }
    }
  }
  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true);
      const playersByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
      setIsLoading(false);
    } catch (error) {
      console.log(error)
      Alert.alert('Pessoas', 'Não foi possiel adicionar o time')
    }finally{
      setIsLoading(false);
    }
  }
  async function groupRemove() {
      try{
        await groupRemoveByName(group);
        navigation.navigate('groups');
      }catch(error){
        Alert.alert('Remover grupo', 'Não foi possivel remover o grupo.')
      }
  }
  async function handelPlayerRemove(playerName: string) {
    try{
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
    }catch(error){
      Alert.alert('Remover pessoa', 'não foi possivel remover a pessoa')
    }
  }
  async function handleGroupRemove() {
    Alert.alert(
      'Remover',
      'Deseja remover o grupo',
      [
        {text: 'Não', style: 'cancel'},
        {text: 'Sim', onPress: () => groupRemove()}
      ]   
    )
  }
  useEffect(()=>{
    fetchPlayersByTeam();
  },[team]);

  return(
    <Container>
      <Header showBackButton/>
      <HightLight
        title={group}
        subtitle="Adicione a galera e separe os times"
      />
      <Form>
      <Input
        inputRef={newPlayerNameInputRef}
        onChangeText={setNewPlayerName}
        value={newPlayerName}
        placeholder="Nome da Pessoa"
        autoCorrect={false}
        onSubmitEditing={handleAddPlayer}
        returnKeyType="done"
      />
      <ButtonIcon  onPress={handleAddPlayer} icon="add"/>
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
      {isLoading ? <Loading/> :
      <FlatList
        data={players}
        keyExtractor={item=>item.name}
        renderItem={({item})=>(
          <Playercard 
            name={item.name} 
            onRemove={()=> handelPlayerRemove(item.name)}
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
    }
      <Button title="Remover Turma" type="SECONDARY" onPress={handleGroupRemove}/>
    </Container>
  )
}