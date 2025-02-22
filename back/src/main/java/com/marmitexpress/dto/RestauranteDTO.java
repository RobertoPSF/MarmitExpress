package com.marmitexpress.dto;
import com.marmitexpress.models.Item;
import com.marmitexpress.models.Marmita;
import java.util.List;


public class RestauranteDTO {
    private String avaliacao;
    private String usuario;
    private String nome;
    private String email;
    private String senha;
    private List<Item> listaDeItens;
    private List<Marmita> marmitas;
    private List<Double> avaliacoes;
    private boolean aceitandoPedidos;
    private String descricao;

    public RestauranteDTO(String usuario, String nome, String email, String senha) {
        this.usuario = usuario;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
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

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getSenha() {
        return senha;
    }
    public void setSenha(String senha) {
        this.senha = senha;
    }
    public boolean isAceitandoPedidos() {
        return aceitandoPedidos;
    }
    public void setAceitandoPedidos(boolean aceitandoPedidos) {
        this.aceitandoPedidos = aceitandoPedidos;
    }
    public String getDescricao() {
        return descricao;
    }
    public void setDescricao(String descricao) {
        this.descricao = descricao;
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

    @Override
    public String toString() {
        return "RestauranteDTO{" +
                "nome='" + nome + '\'' +
                ", usuario='" + usuario + '\'' +
                ", email='" + email + '\'' +
                ", senha='" + senha + '\'' +
                ", avaliacao='" + avaliacao + '\'' +
                ", aceitandoPedidos=" + aceitandoPedidos +
                ", descricao='" + descricao + '\'' +
                ", itens=" + listaDeItens +
                ", marmitas=" + marmitas +
                ", avaliacoes=" + avaliacoes +
                '}';
    }
}
