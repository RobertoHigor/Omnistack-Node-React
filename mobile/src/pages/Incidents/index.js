import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons'
import { FlatList, View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';
export default function Incidents() {
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1); //para começar na página 1
    const [loading, setLoading] = useState(false); //Armazenar quando se está buscando novos dados, uma página por vez.

    const navigation = useNavigation();
    
    function navigateToDetail(incident) {
        //Recebe o mesmo nome da propriedade name
        navigation.navigate('Detail', { incident }); //O Segundo parâmetro são os valores que iremos enviar para a página
    }

    async function loadIncidents() {
         //Evitar que outra requisição seja feita enquanto uma está acontecendo
        //Por ex, se estiver dando scroll e já está carregando, não tentar fazer de novo
        if (loading) {
            return;
        }
        //Se o total já esta carregado e o numero de incidentes for igual ao total
        //Não precisa buscar informações pois já carregou todas
        if (total > 0 && incidents.length == total){
            return;
        }

        setLoading(true);
        //Pode passar também como ?page=${page}
        const response = await api.get('incidents', {
            params: {page}
        });
        
        //Anexar os novos dados 
        //Nesse caso está anexando os valores anteriors do incidents com os valores recebidos agora.
        setIncidents([...incidents, ...response.data]); //anexar 2 vetores em um vetor
        setTotal(response.headers['x-total-count']);
        setPage(page+1); //Pular para a próxima página
        setLoading(false); //Final da requisição
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList
                style={styles.incidentList}
                data={incidents}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}> ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}> CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}> VALOR:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency', 
                                currency: 'BRL'
                            }).format(incident.value)}
                            </Text>
                        <TouchableOpacity 
                        style={styles.detailsButton} 
                        onPress={() => navigateToDetail(incident)}>
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>                
                )}
            />
        </ View>
    );
}