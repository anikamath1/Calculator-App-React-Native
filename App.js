import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
export default class Apple extends Component
{
    constructor()
    {
        super()
        this.state={
            resultText:"",
            calculationText:""
        }
        this.operations = ['Clr','Del','+','*','^']
    }
    calculateResult()
    {
        const text=this.state.resultText
        console.log(text,eval(text))
        this.setState({
            calculationText:eval(text)
        })

    }
    validate()
    {
        const text=this.state.resultText
        switch(text.slice(-1)){
            case '+':
            case '*':
            case '^':
                return false
        }
        return true
    }
    buttonPressed(text){
        if(text=="=")
        return this.validate() && this.calculateResult()
        console.log(text)
        this.setState({
            resultText:this.state.resultText+text
        })
    }
    operate(operation)
    {
        switch(operation){
            case 'Del':
            let text=this.state.resultText.split('')
            text.pop()
            this.setState({
                resultText:text.join('')
            }

            )
            break;

            case '+':
            case '*':

            const lastChar=this.state.resultText.split('').pop()
            if(this.operations.indexOf(lastChar)>0) return

            if(this.state.text=="")return
            this.setState({

                resultText: this.state.resultText + operation
            })
            break;
            case '^':
            this.setState({
                resultText: this.state.resultText + "**"
            })
            break;
            case 'Clr':
            this.setState({
                resultText: ""

            })


        }
    }

    render()
    {

        let nums=[[1,2,3],[4,5,6],[7,8,9],['.',0,'=']]
        let numberrows=[]
        for(let i=0;i<4;i++)
        {
            let onerow=[]
            for(let j=0;j<3;j++)
            {
                onerow.push(<TouchableOpacity onPress={() => this.buttonPressed(nums[i][j])} style={styles.btn}><Text style={styles.btntext}>{nums[i][j]}</Text></TouchableOpacity>)
            }
            numberrows.push(<View style={styles.row}>{onerow}</View>)
        }
        let ops=[]
        for(let i=0;i<5;i++)
        {
            ops.push(<TouchableOpacity onPress={() => this.operate(this.operations[i])} style={styles.btn}><Text style={styles.btntext,styles.white}>{this.operations[i]}</Text></TouchableOpacity>)
        }




        return (
                    <View style={styles.container}>
                        <View style={styles.result}>
                            <Text style={styles.resultText}>{this.state.resultText}</Text>
                        </View>
                        <View style={styles.calculation}>
                            <Text style={styles.calculationText}>{this.state.calculationText}</Text>
                        </View>
                        <View style={styles.buttons}>
                            <View style={styles.numbers}>
                                {numberrows}
                            </View>
                            <View style={styles.operations}>
                                {ops}
                            </View>
                        </View>
                    </View>
            );
    }

}

const styles=StyleSheet.create(
{
    container:{
    flex: 1,
    },
    btn:{
        flex:1,
        alignItems:'center',
        alignSelf:'stretch',
        justifyContent:'center',
    },
    result:{
      flex: 2,
      backgroundColor: 'white'
    },
    calculation:{
    flex: 1,
    backgroundColor:'white'
    },
    buttons:{
      flex: 7,
      flexDirection:'row'
      //backgroundColor: 'red'
    },
    white:{
        color:'white',
        fontSize:30
    },
    numbers:{
    flex: 3,
    backgroundColor:'#3c4042'
    },
    operations:{
    flex: 1,
    justifyContent:'space-around',
    alignItems:'stretch',
    backgroundColor:'#5f6266'
    },
    row:{
        flexDirection:'row',
        flex:1,
        justifyContent:'space-around',
        alignItems:'center'
    },
    resultText:{
        fontSize: 35,
        textAlign: 'right',
        color:'white',
        justifyContent:'center',
        color:'black'
    },
    calculationText:{
        fontSize: 35,
        textAlign: 'right',
        color: 'white',
        justifyContent:'center',
        color:'black'
    },
    btntext:{
        fontSize:30,
        color:'white'
    }

});
