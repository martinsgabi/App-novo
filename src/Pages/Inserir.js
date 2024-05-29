import { Text, ScrollView, StyleSheet, TextInput, TouchableOpacity,  } from 'react-native'
import React, { useState } from 'react'

export default function Inserir() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [genero, setGenero] = useState('');
    const [error, setError] = useState(false);
    const [sucesso, setSucesso] = useState(false);

    async function Cadastro()
    {
        await fetch('http://10.139.75.18:5251/api/Clients/CreateClient/', {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify( {
               clientName:nome,
               clientEmail:email,
               clientGenere:genero
            })
          })

          .then(( res) => res.json(), setEmail(''), setGenero(''), setNome(''))
          .then( json => console.log(json))
          .catch(err => setError( true ) )  
    }

    return (
        <ScrollView contentContainerStyle={css.container}>
            {sucesso ?
                <Text style={css.text}>Obrigada por se cadastrar, seu cadastro foi realizado com sucesso!</Text>
                :
            <>
          <Text style={css.text}>Insira seus dados:</Text>
    <TextInput
    style={css.input}
    placeholder="Nome "
     value={nome}
     onChangeText={(digitado) => setNome( digitado)}
     />
     
     <TextInput
     style={css.input}
     placeholder="E-mail"
     value={email}
     onChangeText={(digitado) => setEmail( digitado)}
    />

    <TextInput
        style={css.input}
        placeholder="Genêro"
        value={genero}
        onChangeText={(digitado) => setGenero( digitado)}
      />
    <TouchableOpacity style={css.btn} onPress={Cadastro}>
      <Text style={css.btnText}>CADASTRAR</Text>
    </TouchableOpacity>
        {error && <Text style={css.msg}>Revise seus dados por favor!</Text>}
        </>
        }
        </ScrollView>
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
    text: {
      color: "white"
    },
    btn: {
      borderColor: "#b1e6d1", 
      borderWidth: 3,
      padding: 10,
      borderRadius: 5,
      marginTop: 5, 
      width: "90%"    
    },
    btnText: {
      color: '#fff',
      textAlign: 'center',
      justifyContent: 'center',
      color: "#b1e6d1",
    },
    msg: {
      backgroundColor: '#b1e6d1',
      borderColor: "#b1e6d1", 
      borderWidth: 3,
      padding: 10,
      borderRadius: 5,
      marginTop: 5,      
    },
    input: {
      color:"black",
      width: "90%",
      backgroundColor: "#E4E4E4",
      height: 60,
      borderRadius: 3,
      padding: 15,
      marginTop: 15,
      marginBottom: 15,
      borderWidth: 0,
       
  }
})