import AsyncStorage from "@react-native-async-storage/async-storage";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { PLAYERS_COLLECTION } from "@storage/storageConfig";
import { playersGetByGroup } from "./playersGetByGroup";
import { AppError } from "@utils/AppErros";

export async function playerAddByGroup(newPlayer:PlayerStorageDTO, group: string) {
  try {
    const storedPlayers = await playersGetByGroup(group);
    const playerAlreadyExists = storedPlayers.filter(player=> player.name === newPlayer.name);
    if(playerAlreadyExists.length>0){
      throw new AppError('Ja existe essa pessoa nesse time');
    }
    const storage = JSON.stringify([...storedPlayers, newPlayer]);

    await AsyncStorage.setItem(`${PLAYERS_COLLECTION}-${group}`, storage);
  } catch (error) {
    throw (error)
  }
}