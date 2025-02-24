package com.marmitexpress.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Restaurante extends Usuario {
    private String descricao;

    private boolean aceitandoPedidos = false;

    @OneToMany(mappedBy = "restaurante")
    private List<Item> listaDeItens = new ArrayList<>();

    @OneToMany(mappedBy = "restaurante")
    private List<Marmita> marmitas = new ArrayList<>();

    private List<Double> avaliacoes = new ArrayList<>();
    
    @Column(unique = true, nullable = true, length = 77)
    private String chavePix;

    public Restaurante() {

        this.setRole(UsuarioRole.RESTAURANTE);
    }

    public Restaurante(String nome, String email, String senha, String endereco, String telefone) {
        this.setNome(nome);
        this.setEmail(email);
        this.setSenha(senha);
        this.setRole(UsuarioRole.RESTAURANTE);
        this.setEndereco(endereco);
        this.setTelefone(telefone);
    }

    public double getAvaliacao() {
        return avaliacoes.isEmpty() ? 0 : avaliacoes.stream().mapToDouble(Double::doubleValue).average().orElse(0);
    }

    public void adicionarAvaliacao(double avaliacao) {
        this.avaliacoes.add(avaliacao);
    }

    public boolean isAceitandoPedidos() {
        return aceitandoPedidos;
    }

    public void setAceitandoPedidos(boolean aceitandoPedidos) {
        this.aceitandoPedidos = aceitandoPedidos;
    }

    public List<Item> getListaDeItens() {
        return listaDeItens;
    }

    public void setListaDeItens(List<Item> itens) {
        this.listaDeItens = itens;
    }
    public void setListaDeItens(Item item) {
        if (this.listaDeItens == null) {
            this.listaDeItens = new ArrayList<>();
        }
        this.listaDeItens.add(item);
    }

    public List<Marmita> getMarmitas() {
        return marmitas;
    }

    public void setMarmitas(Marmita marmita) {
        this.marmitas.add(marmita);
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getChavePix() {
        return chavePix;
    }

    public void setChavePix(String chavePix) {
        this.chavePix = chavePix;
    }

}
