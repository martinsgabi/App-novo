import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function Busca() {
    const [clients, setClients ] = useState( [] );
    const [error, setError ] = useState(false);
    const [ clientId, setClientId ] = useState(0);
    const [ clientNome, setNome ] = useState();
    const [ clientEmail, setEmail ] = useState();
    const [ clientGenero, setGenero ] = useState();
    const [ edicao, setEdicao ] = useState(false);
    const [deleteResposta, setResposta] = useState(false);

    async function getClients()
    {
        await fetch('http://10.139.75.18:5251/api/Clients/GetAllClients', {
            method: 'GET',
            headers: {
              'content-type': 'application/json'
            }
          })
          .then( res => res.json())
          .then( json => setClients( json ) )
          .catch(err => setError(true))
    }

    async function getClient( id )
    {      
      await fetch('http://10.139.75.18:5251/api/Clients/GetClientId/' + id, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
      })
      .then((response) => response.json())
      .then(json => {
        setClientId(json.clientId);
        setNome( json.clientName );
        setEmail( json.clientEmail );
        setGenero( json.clientGenere)
      });
    }

    async function editClient() {
        console.log(clientId, clientEmail, clientGenero, clientNome )
        await fetch('http://10.139.75.18:5251/api/Clients/Update/' + clientId, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          },
          body: JSON.stringify({
            clientId: clientId,
            clientEmail: clientEmail,
            clientGenere: clientGenero,
            clientName: clientNome
          })
        })
        .then((response) => response.json() )
        .catch( err => console.log(err) );
        getClients();
        setEdicao(false);
      }

    useEffect( () => {
        getClients();
    }, [] );

    useFocusEffect(
        React.useCallback(() => {
            getClients();
        }, [])
    );

    function showAlert(id, clientName) {
        Alert.alert(
          '',
          'Realmente deseja excluir esse cliente?',
          [
            {text: 'Sim', onPress: () => deleteClient(id, clientName)},
            {text: 'Não', onPress: () =>('')},
          ],
          {cancelable: false}
        );
      }

      async function deleteClient(id, clientName){
        await fetch('http://10.139.75.18:5251/api/Clients/DeleteClient/' + id, {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
        .then(res => res.json())
        .then(json => setResposta(json))
        .catch(err => setError(true))

        if(deleteResposta == true)
            {
              Alert.alert(
                '',
                'Client' + clientName + 'excluido com sucesso',
                [
                  {text: '', onPress: () => ('')},
                  {text: 'Ok', onPress: () => ('')},
                ],
                {cancelable: false}
              );
              getClients();
            }
            else{
              Alert.alert(
                '',
                'Client  ' + clientName + '  não foi possível excluir',
                [
                  {text: '', onPress: () => ('')},
                  {text: 'Ok', onPress: () => ('')},
                ],
                {cancelable: false}
              );
              getClients();
            }
        };

    return (
        <View style={css.container}>
          <View style={css.caixa}>
          {edicao == false ? 
           <FlatList 
           style={css.flat}
           data={clients}
           keyExtractor={(item) => item.clientId}
           renderItem={({ item }) => (
            <View style={css.lista}>              
                  <Text style={css.clientname}>{item.clientName}</Text>   
                  <TouchableOpacity style={css.btnEdit} onPress={() => { setEdicao(true); getClient(item.clientId) } }>
                      <Text style={css.btnLoginTextED}>EDITAR</Text>
                  </TouchableOpacity>             
                  <TouchableOpacity style={css.btnDelete} onPress={()=> showAlert(item.clientId, item.clientName)}>
                        <Text style={css.btnLoginTextEX}>EXCLUIR</Text>
                  </TouchableOpacity>              
            </View>
          )}
          />
          :
          <View style={css.editar}>
            <TextInput
            inputMode="text"
            style={css.input}
            value={clientNome}
            onChangeText={(digitado) => setNome(digitado)}
            placeholderTextColor="black"
            />
            <TextInput
            inputMode="email"
            style={css.input}
            value={clientEmail}
            onChangeText={(digitado) => setEmail(digitado)}
            placeholderTextColor="black"
            />
            <TextInput
            inputMode="text"
            style={css.input}
            value={clientGenero}
            onChangeText={(digitado) => setGenero(digitado)}
            placeholderTextColor="black"
            />
            <TouchableOpacity style={css.btnEditar} onPress={() => {editClient()} }>
                  <Text style={css.btnLoginTextED}>SALVAR</Text>
            </TouchableOpacity>
          </View>
          }
          </View>
        </View>
    )
}
const css = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        color:"black"
        
      },
      editar:{
        width: "80%",
        alignItems: 'center',
        justifyContent: 'center',
        color:"black",
        
      },
      box:{
        width: "25%",
        height: 30,
        
      },
      flat: {
        width: '100%',
        color:"black"
      },
      username: {
        
      },
      caixa: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',  
        marginTop: 50
      },
      lista: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 7,
        marginTop: 20,  
      },
      btnEditar: {
        borderColor: "#b1e6d1", 
        borderWidth: 3,
        padding: 10,
        borderRadius: 5,
        marginTop: 5, 
        width: "100%"    
      },
      btnEdit: {
        borderColor: "#b1e6d1", 
        borderWidth: 3,
        padding: 10,
        borderRadius: 5,
        marginTop: 5, 
            
      },
      btnDelete: {
        backgroundColor: '#b1e6d1',
        borderColor: "#b1e6d1", 
        borderWidth: 3,
        padding: 10,
        borderRadius: 5,
        marginTop: 5,      
      },
      btnLoginTextED: {
        color: '#fff',
        textAlign: 'center',
        justifyContent: 'center',
        color: "#b1e6d1",
      },
      btnLoginTextEX: {
        color: '#fff',
        textAlign: 'center',
        justifyContent: 'center',
      },
      input: {
        color:"black",
        width: "100%",
        backgroundColor: "#E4E4E4",
        height: 60,
        borderRadius: 3,
        padding: 15,
        marginTop: 15,
        marginBottom: 15,
        borderWidth: 0,
         
    }
})