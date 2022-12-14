import addressRepository, { AddressInsertData } from "../repository/addressRepository.js"
import usersAddressesRepository from "../repository/usersAddressesRepository.js";
import ErrorMessage from "../utils/errorMessage.js";
import getUserFromToken from "../utils/tokenInfo.js";
import sucessMessage from "../utils/sucessMessage.js";

export type AddressBody = {
    number: string;
    street: string;
    district: string;
    city: string;
    uf: string;
}

export type UpdateAddress = {
    id: number;
    street: string;
    number: string;
    district: string;
    city: string;
    uf: string;
}

async function newAddress(addressData:AddressBody, token:string){
    const { number, street, district, city, uf } = addressData
    const newAddress:AddressInsertData = {
        street,
        number:parseInt(number),
        district,
        city,
        uf
    }
    const address = await addressRepository.newAddress(newAddress)
    if(!address) ErrorMessage(401, "Não foi possível cadastrar este endereço. Tente novamente.")
    const user = await getUserFromToken(token)
    await usersAddressesRepository.newUsersAddresses({
        userId: user.userId,
        addressId: address.id
    })
    return sucessMessage("Endereço cadastrado com sucesso.")
}

async function updateAddress(address:UpdateAddress){
    const { id , street, number, district, city, uf} = address
    const dataAddress:AddressInsertData = {
        number: parseInt(number),
        street,
        district,
        city,
        uf
    }
    await addressRepository.updateAddress(id, dataAddress)
    return sucessMessage("Endereço atualizado.")
}

async function getAddressByUser(token:string){
    const { userId } = await getUserFromToken(token)
    const result = await addressRepository.getAddress(userId)
    return result.address
}

const addressService = {
    newAddress,
    getAddressByUser,
    updateAddress
}
export default addressService