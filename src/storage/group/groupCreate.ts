import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { groupsGetAll } from "./groupsGetAll";
import { AppError } from "@utils/AppErros";

export async function groupCreate(newGroup: string) {
  try{
    const storedGroups = await groupsGetAll();

    const groupAlreadeyExists = storedGroups.includes(newGroup);
    if(groupAlreadeyExists){
        throw new AppError('Ja existe um grupo com esse nome');
    }
    const storage = JSON.stringify([...storedGroups,newGroup]);
    await AsyncStorage.setItem(GROUP_COLLECTION, storage);
  }catch(error){
    throw error;
  }

}