import React from 'react'
import {Share, Text, TouchableOpacity, View} from 'react-native'
import styles from './style';

export default function ResultIMC(props){

    const onShare = async () => {
        const result = await Share.share({
            message: "Meu IMC hoje é: " + props.ResultIMC,
        })
    }

    return (
        <View style={styles.contextImc}>
            <Text style={styles.information}>{props.messageResultImc}</Text>
            <Text style={styles.numberImc}>{props.ResultIMC}</Text>

            <View style={styles.boxShareButton}>
                <TouchableOpacity
                onPress={() => {onShare()}}
                style={styles.shared}><Text style={styles.sharedText}>Share</Text></TouchableOpacity>                
            </View>
        </View>
    );
}