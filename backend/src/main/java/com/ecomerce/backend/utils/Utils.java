package com.ecomerce.backend.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Utils {
    public static boolean validarCNPJ(String cnpj) {
        // Remover caracteres não numéricos
        cnpj = cnpj.replaceAll("\\D", "");

        // Verificar se o CNPJ tem 14 dígitos
        if (cnpj.length() != 14)
            return false;

        // Calcular e verificar o primeiro dígito verificador
        int soma = 0;
        int peso = 5;
        for (int i = 0; i < 12; i++) {
            soma += Integer.parseInt(cnpj.substring(i, i + 1)) * peso;
            peso--;
            if (peso == 1)
                peso = 9;
        }
        int digito1 = 11 - (soma % 11);
        if (digito1 > 9) {
            digito1 = 0;
        }
        if (digito1 != Integer.parseInt(cnpj.substring(12, 13))) {
            return false;
        }

        // Calcular e verificar o segundo dígito verificador
        soma = 0;
        peso = 6;
        for (int i = 0; i < 13; i++) {
            soma += Integer.parseInt(cnpj.substring(i, i + 1)) * peso;
            peso--;
            if (peso == 1)
                peso = 9;
        }
        int digito2 = 11 - (soma % 11);
        if (digito2 > 9) {
            digito2 = 0;
        }
        if (digito2 != Integer.parseInt(cnpj.substring(13))) {
            return false;
        }

        // CNPJ válido
        return true;
    }

    public static boolean validarCPF(String cpf) {
        // Remover caracteres não numéricos
        cpf = cpf.replaceAll("\\D", "");

        // Verificar se o CPF tem 11 dígitos
        if (cpf.length() != 11)
            return false;

        // Verificar se todos os dígitos são iguais
        if (cpf.matches("(\\d)\\1{10}"))
            return false;

        // Calcular e verificar o primeiro dígito verificador
        int soma = 0;
        for (int i = 0; i < 9; i++) {
            soma += Integer.parseInt(cpf.substring(i, i + 1)) * (10 - i);
        }
        int digito1 = 11 - (soma % 11);
        if (digito1 > 9) {
            digito1 = 0;
        }
        if (digito1 != Integer.parseInt(cpf.substring(9, 10))) {
            return false;
        }

        // Calcular e verificar o segundo dígito verificador
        soma = 0;
        for (int i = 0; i < 10; i++) {
            soma += Integer.parseInt(cpf.substring(i, i + 1)) * (11 - i);
        }
        int digito2 = 11 - (soma % 11);
        if (digito2 > 9) {
            digito2 = 0;
        }
        if (digito2 != Integer.parseInt(cpf.substring(10))) {
            return false;
        }

        // CPF válido
        return true;

    }

    public static String inserirMascara(String CPF) {
        CPF = CPF.replaceAll("[^0-9]", "");
        return CPF.replaceAll("(\\d{3})(\\d{3})(\\d{3})(\\d{2})", "$1.$2.$3-$4");
    }

    public static String hashPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-512"); //1

            byte[] hashedBytes = md.digest(password.getBytes()); //1

            StringBuilder stringBuilder = new StringBuilder();//1
            for (byte b : hashedBytes) { //n
                stringBuilder.append(String.format("%02x", b));//1
            }

            return stringBuilder.toString(); //1

        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();//1
            return null; //1
        }


    }
}
