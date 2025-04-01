package com.marmitexpress.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Restaurante extends Usuario {

    @Column(nullable = false)
    private String nomeProprietario;
    
    @Column(nullable = true)
    private String descricao;

    private boolean aceitandoPedidos = false;

    @OneToMany(mappedBy = "restaurante", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Ingrediente> ingredientes = new ArrayList<>();

    @OneToMany(mappedBy = "restaurante", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Item> listaDeItems = new ArrayList<>();

    @OneToMany(mappedBy = "restaurante", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Marmita> marmitas = new ArrayList<>();

    @OneToMany(mappedBy = "restaurante", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("restaurante-pedido")
    private List<Pedido> listaDePedidos = new ArrayList<>();

    @Column(unique = true, nullable = true, length = 77)
    private String chavePix;

    public Restaurante() {
        this.setRole(UsuarioRole.RESTAURANTE);
    }

    public Restaurante(String nome, String email, String senha, String endereco, String telefone, String nomeProprietario, String descricao, String chavePix) {
        this.setNome(nome);
        this.setEmail(email);
        this.setSenha(senha);
        this.setRole(UsuarioRole.RESTAURANTE);
        this.setEndereco(endereco);
        this.setTelefone(telefone);
        this.setNomeProprietario(nomeProprietario);
        this.setDescricao(descricao);
        this.setChavePix(chavePix);;
    }

    public void addPedido(Pedido pedido) {
        pedido.setRestaurante(this);
        this.listaDePedidos.add(pedido);
    }

}
