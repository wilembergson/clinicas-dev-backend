import addressRepository, { AddressInsertData } from "../repository/addressRepository.js"
import usersAddressesRepository from "../repository/usersAddressesRepository.js";
import ErrorMessage from "../utils/errorMessage.js";
import getUserIdFromToken from "../utils/tokenInfo.js";
import sucessMessage from "../utils/sucessMessage.js"

export type AddressBody = {
    number: string;
    street: string;
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
    const userId = await getUserIdFromToken(token)
    await usersAddressesRepository.newUsersAddresses({
        userId,
        addressId: address.id
    })
    return sucessMessage("Endereço cadastrado com sucesso.")
}

async function getAddressByUser(token:string){
    const userId = await getUserIdFromToken(token)
    const result = await addressRepository.getAddress(userId)
    return result.address
}

const addressService = {
    newAddress,
    getAddressByUser
}
export default addressService