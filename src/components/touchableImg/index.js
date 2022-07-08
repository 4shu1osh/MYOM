import {TouchableOpacity, Image} from 'react-native';
import React from 'react';

export default function TouchableImg(props) {
    const {onPress, source, style} = props;
    return (
        <TouchableOpacity onPress={onPress}>
        <Image source={source} style={style} />
        </TouchableOpacity>
    );
    }