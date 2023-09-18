import { Header } from '@components/Header';
import { Container } from './styles';
import { HightLight } from '@components/HightLight';
import { GroupCard } from '@components/GroupCard';
import { FlatList } from 'react-native';
import { ListEmpty } from '@components/ListEmpty';
import { useCallback, useState } from 'react';
import { Button } from '@components/Button';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { groupsGetAll } from '@storage/group/groupsGetAll';
import { Loading } from '@components/Loading';

export default function Groups() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);
  const navigation = useNavigation();
  function handleNewGroup(){
    navigation.navigate('new');
  }
async function fetchGroups() {
  try {
      setIsLoading(true);
      const data = await groupsGetAll();
      setGroups(data);
      setIsLoading(false);
  } catch (error) {
    console.error(error)
  } finally{
    setIsLoading(false);
  }
}

function handelOpenGroup(group:string){
  navigation.navigate('players', {group});
}
  useFocusEffect(useCallback(()=>{
    fetchGroups();
  },[]));

  return (
    <Container>
      <Header />
      <HightLight 
        title='Turmas'
        subtitle='Jogue com a sua turma'
      />
      {isLoading ? <Loading/> : 
        <FlatList 
          data={groups}
          keyExtractor={item => item}
          renderItem={({item})=>(
            <GroupCard 
            title={item}
            onPress={()=>handelOpenGroup(item)}
            />
          )}
          contentContainerStyle={groups.length === 0 && {flex: 1}}
          ListEmptyComponent={()=> (
            <ListEmpty message='Cadastre uma turma' />
          )}
          showsVerticalScrollIndicator={false}
        />
      }
      <Button 
        title='Criar nova turma'
        onPress={handleNewGroup}
      />
      
    </Container>
  );
}