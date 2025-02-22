package com.marmitexpress.dto;
import com.marmitexpress.models.Item;
import com.marmitexpress.models.Marmita;
import java.util.List;


public class RestauranteResponseDTO {
    private String avaliacao;
    private String usuario;
    private String nome;
    private String endereco;
    private String telefone;
    private List<Item> listaDeItens;
    private List<Marmita> marmitas;
    private List<Double> avaliacoes;
    private String descricao;

    public RestauranteResponseDTO(String usuario, String nome, String endereco, String telefone) {
        this.usuario = usuario;
        this.nome = nome;
        this.endereco = endereco;
        this.telefone = telefone;
    }

    public String getAvaliacao() {
        return avaliacao;
    }
    public void setAvaliacao(String avaliacao) {
        this.avaliacao = avaliacao;
    }
    public String getUsuario() {
        return usuario;
    }
    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getEndereco() {
        return endereco;
    }
    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }
    public String getTelefone() {
        return telefone;
    }
    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }
    public List<Item> getListaDeItens() {
        return listaDeItens;
    }
    public void setListaDeItens(List<Item> listaDeItens) {
        this.listaDeItens = listaDeItens;
    }
    public List<Marmita> getMarmitas() {
        return marmitas;
    }
    public void setMarmitas(List<Marmita> marmitas) {
        this.marmitas = marmitas;
    }
    public List<Double> getAvaliacoes() {
        return avaliacoes;
    }
    public void setAvaliacoes(List<Double> avaliacoes) {
        this.avaliacoes = avaliacoes;
    }
    public String getDescricao() {
        return descricao;
    }
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    @Override
    public String toString() {
        return "RestauranteResponseDTO{" +
                "nome='" + nome + '\'' +
                ", usuario='" + usuario + '\'' +
                ", avaliacao='" + avaliacao + '\'' +
                ", endereco='" + endereco + '\'' +
                ", telefone='" + telefone + '\'' +
                ", descricao='" + descricao + '\'' +
                ", itens=" + listaDeItens +
                ", marmitas=" + marmitas +
                ", avaliacoes=" + avaliacoes +
                '}';
    }
}
