import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Platform, StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { Formik } from 'formik';
import * as yup from 'yup';

import * as authActions from '../store/actions/auth';

export default function SignupScreen() {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

                <View style={styles.getStartedContainer}>

                    <Text style={styles.getStartedText}>Register Page</Text>

                    <Formik
                        initialValues={{
                            username: '',
                            email: '',
                            password: '',
                            repeatpassword: '',
                            firstname: '',
                            lastname: '',
                        }}
                        onSubmit={values => {
                            dispatch(authActions.register(
                                values.username,
                                values.email,
                                values.password,
                                values.repeatpassword,
                                values.firstname,
                                values.lastname
                            ));
                        }}
                        validationSchema={yup.object().shape({
                            username: yup
                                .string()
                                .min(3)
                                .required(),
                            email: yup
                                .string()
                                .email()
                                .required(),
                            password: yup
                                .string()
                                .min(6)
                                .required(),
                            repeatpassword: yup
                                .string()
                                .required()
                                .test('passwords-match', 'Passwords must match ya fool', function(value) {
                                    return this.parent.password === value;
                                }),
                            firstname: yup
                                .string()
                                .required(),
                            lastname: yup
                                .string()
                                .required(),
                        })}
                    >
                        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                            <Fragment>
                                <TextInput
                                    value={values.username}
                                    onChangeText={handleChange('username')}
                                    onBlur={() => setFieldTouched('username')}
                                    placeholder="Username"
                                />
                                {touched.username && errors.username &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.username}</Text>
                                }

                                <TextInput
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    onBlur={() => setFieldTouched('email')}
                                    placeholder="E-mail"
                                />
                                {touched.email && errors.email &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                                }

                                <TextInput
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    placeholder="Password"
                                    onBlur={() => setFieldTouched('password')}
                                    secureTextEntry={true}
                                />
                                {touched.password && errors.password &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
                                }

                                <TextInput
                                    value={values.repeatpassword}
                                    onChangeText={handleChange('repeatpassword')}
                                    onBlur={() => setFieldTouched('repeatpassword')}
                                    placeholder="repeatpassword"
                                    secureTextEntry={true}
                                />
                                {touched.repeatpassword && errors.repeatpassword &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.repeatpassword}</Text>
                                }

                                <TextInput
                                    value={values.firstname}
                                    onChangeText={handleChange('firstname')}
                                    onBlur={() => setFieldTouched('firstname')}
                                    placeholder="Firstname"
                                />
                                {touched.firstname && errors.firstname &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.firstname}</Text>
                                }

                                <TextInput
                                    value={values.lastname}
                                    onChangeText={handleChange('lastname')}
                                    onBlur={() => setFieldTouched('lastname')}
                                    placeholder="Lastname"
                                />
                                {touched.lastname && errors.lastname &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.lastname}</Text>
                                }

                                <Button
                                    title='Register'
                                    disabled={!isValid}
                                    onPress={handleSubmit}
                                />
                            </Fragment>
                        )}
                    </Formik>

                </View>

            </ScrollView>
        </View>
    );
}

SignupScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});
