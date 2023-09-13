import { Header } from '@components/Header';
import { Container } from './styles';
import { HightLight } from '@components/HightLight';
import { GroupCard } from '@components/GroupCard';
import { FlatList } from 'react-native';
import { ListEmpty } from '@components/ListEmpty';
import { useState } from 'react';
import { Button } from '@components/Button';

export default function Groups() {
  const [groups, setGroups] = useState<string[]>([]);
  return (
    <Container>
      <Header />
      <HightLight 
        title='Turmas'
        subtitle='Jogue com a sua turma'
      />
      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({item})=>(
          <GroupCard 
          title={item}
          
          />
        )}
        contentContainerStyle={groups.length === 0 && {flex: 1}}
        ListEmptyComponent={()=> (
          <ListEmpty message='Cadastre uma turma' />
        )}
      />

      <Button 
        title='Criar nova turma'
      />
      
    </Container>
  );
}