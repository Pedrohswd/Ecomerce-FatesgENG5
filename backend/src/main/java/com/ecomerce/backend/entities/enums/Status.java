package com.ecomerce.backend.entities.enums;

public enum Status {
    ATIVO(0, "ATIVO"), INATIVO(1, "INATIVO");

    private Integer codigo;
    private String descricao;

    Status(Integer codigo, String descricao) {
        this.codigo = codigo;
        this.descricao = descricao;
    }

    public Integer getCodigo() {
        return codigo;
    }

    public String getDescricao() {
        return descricao;
    }

    public static Status toEnum(Integer cod) {
        if (cod == null) {
            return null;
        }
        for (Status x : Status.values()) {
            if (cod.equals(x.codigo)) {
                return x;
            }
        }
        throw new IllegalArgumentException("Status inválido");
    }
}
