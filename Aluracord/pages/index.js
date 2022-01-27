import appConfig from '../config.json';
import {Box, Button, Text, TextField, Image} from '@skynexui/components';
import {useRouter} from 'next/router';
import React from 'react';



function Titulo(props){
    // console.log(props);
    const Tag = props.tag || 'h1';
    return(
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
                ${Tag} {
                    color: ${appConfig.theme.colors.neutrals[100]};
                    font-size: 24px;
                    font-weigth:600;
                }
            `}</style>
        </>
    );
}

{/* function HomePage() {
    return (
        <div style={{backgroundColor:'black'}}>
            <GlobalStyle/>
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
            <h2>Discord - Alura Matrix</h2>
            
        </div>
    )
}
*/}
export default function PaginaInicial() {
    //const username = 'raphael-ramos';
    const [username, setUsername] = React.useState('raphael-ramos');
    const [lengUsername, setLengUsername] = React.useState(true);
    const roteamento = useRouter();
  
    return (
      <>
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: appConfig.theme.colors.neutrals[400],
            backgroundImage: 'url(https://s2.glbimg.com/iQN7JI_QDQWYQpKVyLrnYc-fPWk=/smart/e.glbimg.com/og/ed/f/original/2021/08/28/f1.jpeg)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', maxWidth: '700px',
              borderRadius: '5px', padding: '32px', margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: appConfig.theme.colors.neutrals[700],
            }}
          >
            {/* Formulário */}
            <Box
              as="form"
              onSubmit={function (infosDoEvento){
                infosDoEvento.preventDefault(); //previne do comportamento default de um submit (redirecionar o submit para uma página em caso do submit)
                roteamento.push('/chat');
                
                // window.location.href = '/chat'; //redireciona para a página especificada (recarregando a página)
              }}
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
              }}
            >
              <Titulo tag="h2">Boas vindas de volta!</Titulo>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                {appConfig.name}
              </Text>
              
              <TextField
              value
                fullWidth
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[200],
                    mainColor: appConfig.theme.colors.neutrals[900],
                    mainColorHighlight: appConfig.theme.colors.primary[500],
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                  },
                }}
                value={username}
                onChange={function (event){
                  //onde está o valor?
                  const valor = event.target.value
                  //trocar o valor da variavel
                  setUsername(valor)
                  valor.length < 2 ? setLengUsername(true) :  setLengUsername(false)
                }}
              />
              <Button
                type='submit'
                label='Entrar'
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary[500],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[600],
                }}
                disabled={lengUsername}
              />
            </Box>
            {/* Formulário */}
  
  
            {/* Photo Area */}
            
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '16px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals[999],
                borderRadius: '10px',
                flex: 1,
                minHeight: '240px',
              }}
            >
              {username.length >= 2 ?
              <>
              <Image
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '16px',
                }}
                src={`https://github.com/${username}.png`}
              />
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {username}
              </Text>
              </>
              : <div></div>}
            </Box>
            {/* Photo Area */}
          </Box>
        </Box>
      </>
    );
  }

