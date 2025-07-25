import Header from '@/components/Header'
import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const cycle = () => {
  return (
    <SafeAreaView>
      <Header/>
    </SafeAreaView>
  )
}

export default cycle

const styles = StyleSheet.create({})