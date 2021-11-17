import React, { useState} from 'react'
import {View, Text, TextInput, 
        TouchableOpacity, Vibration,
        Pressable, Keyboard, FlatList} from 'react-native'
import ResultIMC from './ResultIMC/'
import styles from './style'

export default function Form(){

    const [height, setHeight]= useState(null)
    const [weight, setWeight]= useState(null)
    const [messageImc, setMessageImc]= useState("preencha o peso e a altura")
    const [imc, setImc]= useState(null)
    const [textButton, setTextButton]= useState("Calcular")
    const [erroMessage, setErrorMessage] = useState(null)
    const [imcList, setImcList] = useState([])

    function imcCalculator(){
        let heightFormated = height.replace(",", ".")
        let weightFormated = weight.replace(",", ".")
        let totalImc = ((weightFormated/(heightFormated*heightFormated)).toFixed(2))

        //set value to array
        setImcList ((arr) => [...arr, {id: new Date().getTime(), imc: totalImc}])

        setImc(totalImc)
    }

    function checkImc(){
        if(imc == null){
            Vibration.vibrate()
            setErrorMessage("campo obrigatório *")
        }
    }

    function imcValidation(){
        
        console.log(imcList)

        if(weight != null && height != null){
            imcCalculator()
            setWeight(null)
            setHeight(null)
            setMessageImc("Seu IMC é:")
            setTextButton("Calcular Novamente")
            setErrorMessage(null)
        }
        else{
            checkImc()
            setImc(null)
            setTextButton("Calcular")
            setMessageImc("preencha o peso e a altura")
        }
    }

    return (
            <View style={styles.formContext}>
            {imc == null ? 
                <Pressable onPress={Keyboard.dismiss} style={styles.form}>
                    <Text style={styles.formLabel}>Altura</Text>
                    <Text style={styles.errorMessage}>{erroMessage}</Text>
                    <TextInput 
                        style={styles.input}
                        onChangeText={setHeight}
                        value={height}
                        placeholder="Ex. 1.75"
                        keyboardType="numeric"
                    />
                    <Text style={styles.formLabel}>Peso</Text>
                    <Text style={styles.errorMessage}>{erroMessage}</Text>
                    <TextInput 
                        style={styles.input}
                        onChangeText={setWeight}
                        value={weight}
                        placeholder="Ex. 75.345"
                        keyboardType="numeric"
                    />

                    <TouchableOpacity
                        style={styles.buttonCalculator}
                        onPress={() => {imcValidation()}}
                    >
                        <Text style={styles.textButtonCalculator}>{textButton}</Text>
                    </TouchableOpacity>
                </Pressable>
            : 
                <View style={styles.showResultImc}>
                    <ResultIMC messageResultImc={messageImc} ResultIMC={imc} />
                    <TouchableOpacity
                        style={styles.buttonCalculator}
                        onPress={() => {imcValidation()}}
                    >
                        <Text style={styles.textButtonCalculator}>{textButton}</Text>
                    </TouchableOpacity>
                </View>
            }
            <FlatList 
            showsVerticalScrollIndicator={false}
            style={styles.listImc}
            data={imcList.reverse()}
            renderItem={({item}) => {
                    return(
                    <Text style={styles.resultImcItem}>
                        <Text style={styles.textResultItemList}>Resultado Imc: </Text>
                        {item.imc}
                    </Text>)
            }}
            keyExtractor={(item) => { item.id }}
            />
        </View>
    );
}