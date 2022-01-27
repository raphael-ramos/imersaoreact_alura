import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';

import supabaseClient from '../src/services/auth'; //importa as configurações de conexão do supabase

// import {createClient} from '@supabase/supabase-js';
/* 
const SUPABASE_ANON_KEY = 'key anonima (importada do arquivo de autenticação auth.js)';
const SUPABASE_URL = 'url da api (importada do arquivo de autenticação auth.js) ';
const supabaseClient = createClient(SUPABASE_URL,SUPABASE_ANON_KEY); 
*/


export default function PaginaDoChat() {
    
    // Sua lógica vai aqui
    const [mensagem, setMensagem] = React.useState('');
    const [listaMensagens, setListaMensagens] = React.useState([]);

    /* o useEffect por padrão é executado sempre quando a página carrega
    caso seja necessário chamar novamente a requisição do useEffect 
    é necessário informar no array qual o item que ele tem que observar, 
    quando o item for mudado ele executará a chamada dentro do useEffect */
    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('created_at', {ascending:false})
            .then(({data}) => {
                console.log(data);
                setListaMensagens(data);
            });
    },[]);

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            // id: listaMensagens.length + 1,
            texto: novaMensagem,
            de: 'vanessametonini',
        }

        supabaseClient
            .from('mensagens')
            .insert([mensagem])
            .then(({data}) => {
                console.log('Criando mensagem',data);
                setListaMensagens([
                    data[0],
                    ...listaMensagens,
                ])
            })
        setMensagem('');
    }


    // ./Sua lógica vai aqui
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.neutrals[400],
                backgroundImage: `url(https://s2.glbimg.com/iQN7JI_QDQWYQpKVyLrnYc-fPWk=/smart/e.glbimg.com/og/ed/f/original/2021/08/28/f1.jpeg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList mensagens={listaMensagens} />
                    
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();

                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    //console.log('mensagens', props.mensagens);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflowY: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (

                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {mensagem.texto}
                    </Text>
                )
            })}
        </Box>
    )
}