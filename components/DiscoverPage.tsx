
import React, { useState, useMemo } from 'react';
import { Search, Filter, MapPin, Users, TrendingUp, Briefcase, Award, Building2, ChevronDown, X, ArrowLeft, Globe, Zap, CheckCircle2 } from 'lucide-react';

interface DiscoverPageProps {
  onBack: () => void;
  onSignup: () => void;
}

// 🎯 DATABASE - 100 TOP INFLUENCIADORES + 100 TOP MARCAS
const DATABASE = {
  influencers: [
    { id: 1, name: "Whindersson Nunes", niche: "Comédia", location: "São Paulo, SP", followers: "59M", engagement: "4.2%", verified: true },
    { id: 2, name: "Viih Tube", niche: "Lifestyle", location: "São Paulo, SP", followers: "32M", engagement: "5.8%", verified: true },
    { id: 3, name: "Felipe Neto", niche: "Entretenimento", location: "Rio de Janeiro, RJ", followers: "45M", engagement: "3.9%", verified: true },
    { id: 4, name: "Bianca Andrade", niche: "Beleza", location: "São Paulo, SP", followers: "18M", engagement: "6.2%", verified: true },
    { id: 5, name: "Virginia Fonseca", niche: "Lifestyle", location: "Goiânia, GO", followers: "48M", engagement: "7.1%", verified: true },
    { id: 6, name: "Carlinhos Maia", niche: "Comédia", location: "Alagoas, AL", followers: "30M", engagement: "5.5%", verified: true },
    { id: 7, name: "Camila Loures", niche: "Lifestyle", location: "São Paulo, SP", followers: "10M", engagement: "4.8%", verified: true },
    { id: 8, name: "Julio Cocielo", niche: "Comédia", location: "São Paulo, SP", followers: "22M", engagement: "4.1%", verified: true },
    { id: 9, name: "Maisa Silva", niche: "Entretenimento", location: "São Paulo, SP", followers: "46M", engagement: "5.9%", verified: true },
    { id: 10, name: "Bruna Marquezine", niche: "Moda", location: "Rio de Janeiro, RJ", followers: "43M", engagement: "6.5%", verified: true },
    { id: 11, name: "Anitta", niche: "Música", location: "Rio de Janeiro, RJ", followers: "65M", engagement: "8.2%", verified: true },
    { id: 12, name: "Neymar Jr", niche: "Esportes", location: "São Paulo, SP", followers: "215M", engagement: "3.8%", verified: true },
    { id: 13, name: "Jade Picon", niche: "Moda", location: "São Paulo, SP", followers: "21M", engagement: "7.3%", verified: true },
    { id: 14, name: "Ítalo Ferreira", niche: "Esportes", location: "RN", followers: "3.2M", engagement: "5.1%", verified: true },
    { id: 15, name: "Mari Maria", niche: "Beleza", location: "São Paulo, SP", followers: "12M", engagement: "6.8%", verified: true },
    { id: 16, name: "Lucas Rangel", niche: "Lifestyle", location: "Rio de Janeiro, RJ", followers: "19M", engagement: "5.4%", verified: true },
    { id: 17, name: "Pequena Lo", niche: "Comédia", location: "Recife, PE", followers: "28M", engagement: "6.9%", verified: true },
    { id: 18, name: "Blogueirinha", niche: "Entretenimento", location: "São Paulo, SP", followers: "5.8M", engagement: "7.5%", verified: true },
    { id: 19, name: "Gaules", niche: "Games", location: "São Paulo, SP", followers: "4.5M", engagement: "9.2%", verified: true },
    { id: 20, name: "Casimiro", niche: "Games", location: "Rio de Janeiro, RJ", followers: "8.9M", engagement: "8.8%", verified: true },
    { id: 21, name: "Luísa Sonza", niche: "Música", location: "Porto Alegre, RS", followers: "30M", engagement: "6.4%", verified: true },
    { id: 22, name: "Gkay", niche: "Comédia", location: "Fortaleza, CE", followers: "20M", engagement: "5.7%", verified: true },
    { id: 23, name: "Thiago Ventura", niche: "Comédia", location: "São Paulo, SP", followers: "7.2M", engagement: "7.8%", verified: true },
    { id: 24, name: "Fábio Porchat", niche: "Entretenimento", location: "Rio de Janeiro, RJ", followers: "15M", engagement: "4.9%", verified: true },
    { id: 25, name: "Tatá Werneck", niche: "Comédia", location: "Rio de Janeiro, RJ", followers: "56M", engagement: "6.1%", verified: true },
    { id: 26, name: "Alok", niche: "Música", location: "Goiânia, GO", followers: "28M", engagement: "5.3%", verified: true },
    { id: 27, name: "Larissa Manoela", niche: "Entretenimento", location: "São Paulo, SP", followers: "50M", engagement: "6.7%", verified: true },
    { id: 28, name: "Sabrina Sato", niche: "Entretenimento", location: "São Paulo, SP", followers: "29M", engagement: "5.2%", verified: true },
    { id: 29, name: "Thais Carla", niche: "Moda", location: "Salvador, BA", followers: "2.8M", engagement: "8.1%", verified: true },
    { id: 30, name: "Camila Coutinho", niche: "Moda", location: "Fortaleza, CE", followers: "6.1M", engagement: "4.6%", verified: true },
    { id: 31, name: "Niina Secrets", niche: "Beleza", location: "São Paulo, SP", followers: "5.4M", engagement: "5.9%", verified: true },
    { id: 32, name: "Dani Russo", niche: "Fitness", location: "São Paulo, SP", followers: "1.9M", engagement: "7.2%", verified: true },
    { id: 33, name: "Gabriela Pugliesi", niche: "Fitness", location: "São Paulo, SP", followers: "4.7M", engagement: "6.3%", verified: true },
    { id: 34, name: "Carol Borba", niche: "Fitness", location: "Curitiba, PR", followers: "3.2M", engagement: "6.8%", verified: true },
    { id: 35, name: "Karol Pinheiro", niche: "Beleza", location: "São Paulo, SP", followers: "2.1M", engagement: "7.4%", verified: true },
    { id: 36, name: "Alice Salazar", niche: "Beleza", location: "São Paulo, SP", followers: "1.8M", engagement: "6.9%", verified: true },
    { id: 37, name: "Pedro Sampaio", niche: "Música", location: "Rio de Janeiro, RJ", followers: "12M", engagement: "7.1%", verified: true },
    { id: 38, name: "Ludmilla", niche: "Música", location: "Rio de Janeiro, RJ", followers: "27M", engagement: "6.8%", verified: true },
    { id: 39, name: "MC Hariel", niche: "Música", location: "São Paulo, SP", followers: "8.5M", engagement: "5.9%", verified: true },
    { id: 40, name: "Kevinho", niche: "Música", location: "São Paulo, SP", followers: "19M", engagement: "5.4%", verified: true },
    { id: 41, name: "Tirullipa", niche: "Comédia", location: "Fortaleza, CE", followers: "27M", engagement: "5.8%", verified: true },
    { id: 42, name: "Aline Wirley", niche: "Entretenimento", location: "Rio de Janeiro, RJ", followers: "5.2M", engagement: "6.2%", verified: true },
    { id: 43, name: "Débora Nascimento", niche: "Moda", location: "São Paulo, SP", followers: "11M", engagement: "5.6%", verified: true },
    { id: 44, name: "Priscila Fantin", niche: "Lifestyle", location: "Rio de Janeiro, RJ", followers: "4.8M", engagement: "5.1%", verified: true },
    { id: 45, name: "Paulo Gustavo", niche: "Comédia", location: "Rio de Janeiro, RJ", followers: "14M", engagement: "8.9%", verified: true },
    { id: 46, name: "Preta Gil", niche: "Música", location: "Rio de Janeiro, RJ", followers: "9.8M", engagement: "6.4%", verified: true },
    { id: 47, name: "Fernanda Paes Leme", niche: "Entretenimento", location: "Rio de Janeiro, RJ", followers: "8.7M", engagement: "5.7%", verified: true },
    { id: 48, name: "Marcela MC Gowan", niche: "Lifestyle", location: "São Paulo, SP", followers: "3.9M", engagement: "6.9%", verified: true },
    { id: 49, name: "Gil do Vigor", niche: "Entretenimento", location: "Recife, PE", followers: "17M", engagement: "7.6%", verified: true },
    { id: 50, name: "Juliette Freire", niche: "Entretenimento", location: "João Pessoa, PB", followers: "35M", engagement: "8.2%", verified: true },
    { id: 51, name: "Thelminha Assis", niche: "Saúde", location: "São Paulo, SP", followers: "7.1M", engagement: "5.8%", verified: true },
    { id: 52, name: "Babu Santana", niche: "Entretenimento", location: "Rio de Janeiro, RJ", followers: "5.6M", engagement: "6.3%", verified: true },
    { id: 53, name: "Rafa Kalimann", niche: "Moda", location: "Goiânia, GO", followers: "20M", engagement: "6.7%", verified: true },
    { id: 54, name: "Manu Gavassi", niche: "Música", location: "São Paulo, SP", followers: "15M", engagement: "7.1%", verified: true },
    { id: 55, name: "Pyong Lee", niche: "Entretenimento", location: "São Paulo, SP", followers: "18M", engagement: "5.9%", verified: true },
    { id: 56, name: "Thaynara OG", niche: "Lifestyle", location: "São Luís, MA", followers: "4.3M", engagement: "7.4%", verified: true },
    { id: 57, name: "Giovanna Ewbank", niche: "Lifestyle", location: "Rio de Janeiro, RJ", followers: "24M", engagement: "6.2%", verified: true },
    { id: 58, name: "Bruno Gagliasso", niche: "Entretenimento", location: "Rio de Janeiro, RJ", followers: "18M", engagement: "5.4%", verified: true },
    { id: 59, name: "Flávia Pavanelli", niche: "Moda", location: "São Paulo, SP", followers: "13M", engagement: "6.8%", verified: true },
    { id: 60, name: "Gabriela Rocha", niche: "Música", location: "São Paulo, SP", followers: "8.2M", engagement: "9.1%", verified: true },
    { id: 61, name: "Samuel Nascimento", niche: "Fitness", location: "São Paulo, SP", followers: "2.4M", engagement: "7.3%", verified: true },
    { id: 62, name: "Leo Stronda", niche: "Fitness", location: "Rio de Janeiro, RJ", followers: "5.8M", engagement: "6.1%", verified: true },
    { id: 63, name: "Renato Cariani", niche: "Fitness", location: "São Paulo, SP", followers: "4.1M", engagement: "5.9%", verified: true },
    { id: 64, name: "Fernando Fernandes", niche: "Esportes", location: "São Paulo, SP", followers: "1.7M", engagement: "8.4%", verified: true },
    { id: 65, name: "Gabriel Medina", niche: "Esportes", location: "Maresias, SP", followers: "10M", engagement: "6.7%", verified: true },
    { id: 66, name: "Rayssa Leal", niche: "Esportes", location: "Imperatriz, MA", followers: "7.3M", engagement: "9.3%", verified: true },
    { id: 67, name: "Isadora Pompeo", niche: "Música", location: "Goiânia, GO", followers: "6.9M", engagement: "8.7%", verified: true },
    { id: 68, name: "Tiago Iorc", niche: "Música", location: "São Paulo, SP", followers: "3.8M", engagement: "5.6%", verified: true },
    { id: 69, name: "Dilsinho", niche: "Música", location: "Rio de Janeiro, RJ", followers: "11M", engagement: "6.4%", verified: true },
    { id: 70, name: "Thiaguinho", niche: "Música", location: "São Paulo, SP", followers: "18M", engagement: "5.8%", verified: true },
    { id: 71, name: "Emicida", niche: "Música", location: "São Paulo, SP", followers: "5.2M", engagement: "7.9%", verified: true },
    { id: 72, name: "Iza", niche: "Música", location: "Rio de Janeiro, RJ", followers: "18M", engagement: "7.2%", verified: true },
    { id: 73, name: "Pocah", niche: "Música", location: "Rio de Janeiro, RJ", followers: "16M", engagement: "6.9%", verified: true },
    { id: 74, name: "Lexa", niche: "Música", location: "Rio de Janeiro, RJ", followers: "13M", engagement: "6.5%", verified: true },
    { id: 75, name: "MC Gui", niche: "Música", location: "São Paulo, SP", followers: "14M", engagement: "5.3%", verified: true },
    { id: 76, name: "MC Livinho", niche: "Música", location: "São Paulo, SP", followers: "9.4M", engagement: "5.7%", verified: true },
    { id: 77, name: "Luccas Carlos", niche: "Música", location: "São Paulo, SP", followers: "4.6M", engagement: "7.8%", verified: true },
    { id: 78, name: "Matuê", niche: "Música", location: "Rio de Janeiro, RJ", followers: "6.8M", engagement: "8.3%", verified: true },
    { id: 79, name: "Djonga", niche: "Música", location: "Belo Horizonte, MG", followers: "3.9M", engagement: "8.6%", verified: true },
    { id: 80, name: "Xamã", niche: "Música", location: "Rio de Janeiro, RJ", followers: "2.7M", engagement: "7.4%", verified: true },
    { id: 81, name: "Kondzilla", niche: "Entretenimento", location: "São Paulo, SP", followers: "10M", engagement: "5.9%", verified: true },
    { id: 82, name: "Gabriela Prioli", niche: "Educação", location: "São Paulo, SP", followers: "4.2M", engagement: "7.1%", verified: true },
    { id: 83, name: "Átila Iamarino", niche: "Ciência", location: "São Paulo, SP", followers: "2.1M", engagement: "8.9%", verified: true },
    { id: 84, name: "Drauzio Varella", niche: "Saúde", location: "São Paulo, SP", followers: "5.8M", engagement: "6.8%", verified: true },
    { id: 85, name: "Lutz", niche: "Tech", location: "São Paulo, SP", followers: "1.8M", engagement: "9.4%", verified: true },
    { id: 86, name: "Ei Nerd", niche: "Tech", location: "São Paulo, SP", followers: "3.4M", engagement: "7.6%", verified: true },
    { id: 87, name: "Manual do Mundo", niche: "Ciência", location: "São Paulo, SP", followers: "4.9M", engagement: "8.2%", verified: true },
    { id: 88, name: "Mateus Hwang", niche: "Lifestyle", location: "Curitiba, PR", followers: "2.6M", engagement: "6.7%", verified: true },
    { id: 89, name: "Victor Meyniel", niche: "Moda", location: "São Paulo, SP", followers: "1.9M", engagement: "7.3%", verified: true },
    { id: 90, name: "Boca Rosa Company", niche: "Beleza", location: "São Paulo, SP", followers: "3.2M", engagement: "8.1%", verified: true },
    { id: 91, name: "Paola Carosella", niche: "Gastronomia", location: "São Paulo, SP", followers: "6.7M", engagement: "6.4%", verified: true },
    { id: 92, name: "Henrique Fogaça", niche: "Gastronomia", location: "São Paulo, SP", followers: "5.3M", engagement: "5.9%", verified: true },
    { id: 93, name: "Érick Jacquin", niche: "Gastronomia", location: "São Paulo, SP", followers: "8.1M", engagement: "6.6%", verified: true },
    { id: 94, name: "Rita Lobo", niche: "Gastronomia", location: "São Paulo, SP", followers: "2.9M", engagement: "7.8%", verified: true },
    { id: 95, name: "Mohamad Hindi", niche: "Gastronomia", location: "São Paulo, SP", followers: "1.4M", engagement: "8.3%", verified: true },
    { id: 96, name: "Jout Jout", niche: "Entretenimento", location: "São Paulo, SP", followers: "3.7M", engagement: "6.9%", verified: true },
    { id: 97, name: "Kéfera Buchmann", niche: "Entretenimento", location: "São Paulo, SP", followers: "12M", engagement: "5.4%", verified: true },
    { id: 98, name: "Dani Noce", niche: "Viagem", location: "São Paulo, SP", followers: "2.3M", engagement: "7.5%", verified: true },
    { id: 99, name: "Tati Ferreira", niche: "Lifestyle", location: "Rio de Janeiro, RJ", followers: "1.7M", engagement: "8.6%", verified: true },
    { id: 100, name: "Spartakus Santiago", niche: "Fitness", location: "São Paulo, SP", followers: "4.8M", engagement: "6.2%", verified: true }
  ],
  brands: [
    { id: 101, name: "Natura", category: "Beleza", location: "São Paulo, SP", campaigns: 12, budget: "Alto", verified: true },
    { id: 102, name: "O Boticário", category: "Beleza", location: "Curitiba, PR", campaigns: 18, budget: "Alto", verified: true },
    { id: 103, name: "Magazine Luiza", category: "Varejo", location: "São Paulo, SP", campaigns: 25, budget: "Alto", verified: true },
    { id: 104, name: "Nubank", category: "Fintech", location: "São Paulo, SP", campaigns: 15, budget: "Alto", verified: true },
    { id: 105, name: "iFood", category: "Food Tech", location: "São Paulo, SP", campaigns: 22, budget: "Alto", verified: true },
    { id: 106, name: "Ambev", category: "Bebidas", location: "São Paulo, SP", campaigns: 30, budget: "Alto", verified: true },
    { id: 107, name: "Coca-Cola Brasil", category: "Bebidas", location: "São Paulo, SP", campaigns: 28, budget: "Alto", verified: true },
    { id: 108, name: "Nike Brasil", category: "Esportes", location: "São Paulo, SP", campaigns: 20, budget: "Alto", verified: true },
    { id: 109, name: "Adidas Brasil", category: "Esportes", location: "São Paulo, SP", campaigns: 16, budget: "Alto", verified: true },
    { id: 110, name: "Netflix Brasil", category: "Streaming", location: "São Paulo, SP", campaigns: 14, budget: "Alto", verified: true },
    { id: 111, name: "Spotify Brasil", category: "Streaming", location: "São Paulo, SP", campaigns: 10, budget: "Médio", verified: true },
    { id: 112, name: "Havaianas", category: "Moda", location: "São Paulo, SP", campaigns: 12, budget: "Alto", verified: true },
    { id: 113, name: "C&A", category: "Moda", location: "São Paulo, SP", campaigns: 15, budget: "Médio", verified: true },
    { id: 114, name: "Renner", category: "Moda", location: "Porto Alegre, RS", campaigns: 18, budget: "Médio", verified: true },
    { id: 115, name: "Riachuelo", category: "Moda", location: "Natal, RN", campaigns: 14, budget: "Médio", verified: true },
    { id: 116, name: "Shopee Brasil", category: "E-commerce", location: "São Paulo, SP", campaigns: 35, budget: "Alto", verified: true },
    { id: 117, name: "Mercado Livre", category: "E-commerce", location: "São Paulo, SP", campaigns: 32, budget: "Alto", verified: true },
    { id: 118, name: "Amazon Brasil", category: "E-commerce", location: "São Paulo, SP", campaigns: 24, budget: "Alto", verified: true },
    { id: 119, name: "Americanas", category: "Varejo", location: "Rio de Janeiro, RJ", campaigns: 20, budget: "Médio", verified: true },
    { id: 120, name: "Casas Bahia", category: "Varejo", location: "São Paulo, SP", campaigns: 16, budget: "Médio", verified: true },
    { id: 121, name: "Samsung Brasil", category: "Tecnologia", location: "São Paulo, SP", campaigns: 18, budget: "Alto", verified: true },
    { id: 122, name: "Xiaomi Brasil", category: "Tecnologia", location: "São Paulo, SP", campaigns: 12, budget: "Médio", verified: true },
    { id: 123, name: "Motorola Brasil", category: "Tecnologia", location: "São Paulo, SP", campaigns: 10, budget: "Médio", verified: true },
    { id: 124, name: "Apple Brasil", category: "Tecnologia", location: "São Paulo, SP", campaigns: 8, budget: "Alto", verified: true },
    { id: 125, name: "McDonald's Brasil", category: "Alimentação", location: "São Paulo, SP", campaigns: 25, budget: "Alto", verified: true },
    { id: 126, name: "Burger King Brasil", category: "Alimentação", location: "São Paulo, SP", campaigns: 20, budget: "Alto", verified: true },
    { id: 127, name: "Subway Brasil", category: "Alimentação", location: "São Paulo, SP", campaigns: 12, budget: "Médio", verified: true },
    { id: 128, name: "99", category: "Mobilidade", location: "São Paulo, SP", campaigns: 16, budget: "Alto", verified: true },
    { id: 129, name: "Uber Brasil", category: "Mobilidade", location: "São Paulo, SP", campaigns: 18, budget: "Alto", verified: true },
    { id: 130, name: "Rappi Brasil", category: "Delivery", location: "São Paulo, SP", campaigns: 22, budget: "Alto", verified: true },
    { id: 131, name: "Gympass", category: "Fitness", location: "São Paulo, SP", campaigns: 8, budget: "Médio", verified: true },
    { id: 132, name: "Smart Fit", category: "Fitness", location: "São Paulo, SP", campaigns: 10, budget: "Médio", verified: true },
    { id: 133, name: "Bio Ritmo", category: "Fitness", location: "São Paulo, SP", campaigns: 6, budget: "Médio", verified: true },
    { id: 134, name: "Vivo", category: "Telecom", location: "São Paulo, SP", campaigns: 20, budget: "Alto", verified: true },
    { id: 135, name: "Tim Brasil", category: "Telecom", location: "Rio de Janeiro, RJ", campaigns: 18, budget: "Alto", verified: true },
    { id: 136, name: "Claro", category: "Telecom", location: "São Paulo, SP", campaigns: 16, budget: "Alto", verified: true },
    { id: 137, name: "Oi", category: "Telecom", location: "Rio de Janeiro, RJ", campaigns: 10, budget: "Médio", verified: true },
    { id: 138, name: "Itaú", category: "Financeiro", location: "São Paulo, SP", campaigns: 15, budget: "Alto", verified: true },
    { id: 139, name: "Bradesco", category: "Financeiro", location: "São Paulo, SP", campaigns: 12, budget: "Alto", verified: true },
    { id: 140, name: "Banco do Brasil", category: "Financeiro", location: "Brasília, DF", campaigns: 14, budget: "Alto", verified: true },
    { id: 141, name: "Santander Brasil", category: "Financeiro", location: "São Paulo, SP", campaigns: 10, budget: "Alto", verified: true },
    { id: 142, name: "Inter", category: "Fintech", location: "Belo Horizonte, MG", campaigns: 12, budget: "Médio", verified: true },
    { id: 143, name: "C6 Bank", category: "Fintech", location: "São Paulo, SP", campaigns: 8, budget: "Médio", verified: true },
    { id: 144, name: "PicPay", category: "Fintech", location: "São Paulo, SP", campaigns: 14, budget: "Médio", verified: true },
    { id: 145, name: "Rappi Pay", category: "Fintech", location: "São Paulo, SP", campaigns: 6, budget: "Médio", verified: true },
    { id: 146, name: "Lojas Renner", category: "Moda", location: "Porto Alegre, RS", campaigns: 12, budget: "Médio", verified: true },
    { id: 147, name: "Marisa", category: "Moda", location: "São Paulo, SP", campaigns: 8, budget: "Baixo", verified: true },
    { id: 148, name: "Zara Brasil", category: "Moda", location: "São Paulo, SP", campaigns: 10, budget: "Alto", verified: true },
    { id: 149, name: "H&M Brasil", category: "Moda", location: "São Paulo, SP", campaigns: 8, budget: "Médio", verified: true },
    { id: 150, name: "Forever 21 Brasil", category: "Moda", location: "São Paulo, SP", campaigns: 6, budget: "Médio", verified: true },
    { id: 151, name: "Sephora Brasil", category: "Beleza", location: "São Paulo, SP", campaigns: 14, budget: "Alto", verified: true },
    { id: 152, name: "Eudora", category: "Beleza", location: "São Paulo, SP", campaigns: 10, budget: "Médio", verified: true },
    { id: 153, name: "Avon", category: "Beleza", location: "São Paulo, SP", campaigns: 12, budget: "Médio", verified: true },
    { id: 154, name: "Mary Kay Brasil", category: "Beleza", location: "São Paulo, SP", campaigns: 8, budget: "Médio", verified: true },
    { id: 155, name: "L'Oréal Brasil", category: "Beleza", location: "Rio de Janeiro, RJ", campaigns: 16, budget: "Alto", verified: true },
    { id: 156, name: "Nestlé Brasil", category: "Alimentação", location: "São Paulo, SP", campaigns: 20, budget: "Alto", verified: true },
    { id: 157, name: "Unilever Brasil", category: "Consumo", location: "São Paulo, SP", campaigns: 22, budget: "Alto", verified: true },
    { id: 158, name: "Mondelez Brasil", category: "Alimentação", location: "São Paulo, SP", campaigns: 14, budget: "Alto", verified: true },
    { id: 159, name: "BRF", category: "Alimentação", location: "Curitiba, PR", campaigns: 10, budget: "Médio", verified: true },
    { id: 160, name: "JBS", category: "Alimentação", location: "São Paulo, SP", campaigns: 8, budget: "Médio", verified: true },
    { id: 161, name: "Red Bull Brasil", category: "Bebidas", location: "São Paulo, SP", campaigns: 12, budget: "Alto", verified: true },
    { id: 162, name: "Heineken Brasil", category: "Bebidas", location: "São Paulo, SP", campaigns: 15, budget: "Alto", verified: true },
    { id: 163, name: "Stella Artois", category: "Bebidas", location: "São Paulo, SP", campaigns: 10, budget: "Médio", verified: true },
    { id: 164, name: "Skol", category: "Bebidas", location: "São Paulo, SP", campaigns: 18, budget: "Alto", verified: true },
    { id: 165, name: "Brahma", category: "Bebidas", location: "Rio de Janeiro, RJ", campaigns: 16, budget: "Alto", verified: true },
    { id: 166, name: "Puma Brasil", category: "Esportes", location: "São Paulo, SP", campaigns: 10, budget: "Médio", verified: true },
    { id: 167, name: "Fila Brasil", category: "Esportes", location: "São Paulo, SP", campaigns: 8, budget: "Médio", verified: true },
    { id: 168, name: "Mizuno Brasil", category: "Esportes", location: "São Paulo, SP", campaigns: 6, budget: "Médio", verified: true },
    { id: 169, name: "Oakley Brasil", category: "Esportes", location: "São Paulo, SP", campaigns: 5, budget: "Médio", verified: true },
    { id: 170, name: "Decathlon Brasil", category: "Esportes", location: "São Paulo, SP", campaigns: 12, budget: "Médio", verified: true },
    { id: 171, name: "Centauro", category: "Esportes", location: "São Paulo, SP", campaigns: 14, budget: "Médio", verified: true },
    { id: 172, name: "Netshoes", category: "E-commerce", location: "São Paulo, SP", campaigns: 10, budget: "Médio", verified: true },
    { id: 173, name: "Dafiti", category: "E-commerce", location: "São Paulo, SP", campaigns: 12, budget: "Médio", verified: true },
    { id: 174, name: "Shein Brasil", category: "E-commerce", location: "São Paulo, SP", campaigns: 16, budget: "Alto", verified: true },
    { id: 175, name: "AliExpress Brasil", category: "E-commerce", location: "São Paulo, SP", campaigns: 14, budget: "Médio", verified: true },
    { id: 176, name: "HBO Max Brasil", category: "Streaming", location: "São Paulo, SP", campaigns: 8, budget: "Alto", verified: true },
    { id: 177, name: "Prime Video Brasil", category: "Streaming", location: "São Paulo, SP", campaigns: 10, budget: "Alto", verified: true },
    { id: 178, name: "Disney+ Brasil", category: "Streaming", location: "São Paulo, SP", campaigns: 12, budget: "Alto", verified: true },
    { id: 179, name: "Globoplay", category: "Streaming", location: "Rio de Janeiro, RJ", campaigns: 8, budget: "Médio", verified: true },
    { id: 180, name: "Paramount+ Brasil", category: "Streaming", location: "São Paulo, SP", campaigns: 6, budget: "Médio", verified: true },
    { id: 181, name: "Kabum", category: "E-commerce", location: "Limeira, SP", campaigns: 10, budget: "Médio", verified: true },
    { id: 182, name: "Ponto Frio", category: "Varejo", location: "São Paulo, SP", campaigns: 12, budget: "Médio", verified: true },
    { id: 183, name: "Extra", category: "Varejo", location: "São Paulo, SP", campaigns: 14, budget: "Médio", verified: true },
    { id: 184, name: "Carrefour Brasil", category: "Varejo", location: "São Paulo, SP", campaigns: 18, budget: "Alto", verified: true },
    { id: 185, name: "Pão de Açúcar", category: "Varejo", location: "São Paulo, SP", campaigns: 16, budget: "Alto", verified: true },
    { id: 186, name: "Atacadão", category: "Varejo", location: "São Paulo, SP", campaigns: 12, budget: "Médio", verified: true },
    { id: 187, name: "Assaí Atacadista", category: "Varejo", location: "São Paulo, SP", campaigns: 10, budget: "Médio", verified: true },
    { id: 188, name: "Volkswagen Brasil", category: "Automotivo", location: "São Paulo, SP", campaigns: 15, budget: "Alto", verified: true },
    { id: 189, name: "Fiat Brasil", category: "Automotivo", location: "Betim, MG", campaigns: 14, budget: "Alto", verified: true },
    { id: 190, name: "Chevrolet Brasil", category: "Automotivo", location: "São Paulo, SP", campaigns: 12, budget: "Alto", verified: true },
    { id: 191, name: "Ford Brasil", category: "Automotivo", location: "São Paulo, SP", campaigns: 10, budget: "Alto", verified: true },
    { id: 192, name: "Hyundai Brasil", category: "Automotivo", location: "São Paulo, SP", campaigns: 11, budget: "Alto", verified: true },
    { id: 193, name: "Toyota Brasil", category: "Automotivo", location: "São Paulo, SP", campaigns: 13, budget: "Alto", verified: true },
    { id: 194, name: "Petrobras", category: "Energia", location: "Rio de Janeiro, RJ", campaigns: 8, budget: "Alto", verified: true },
    { id: 195, name: "Shell Brasil", category: "Energia", location: "Rio de Janeiro, RJ", campaigns: 10, budget: "Alto", verified: true },
    { id: 196, name: "Ipiranga", category: "Energia", location: "São Paulo, SP", campaigns: 12, budget: "Médio", verified: true },
    { id: 197, name: "Azul Linhas Aéreas", category: "Turismo", location: "Barueri, SP", campaigns: 10, budget: "Alto", verified: true },
    { id: 198, name: "Gol Linhas Aéreas", category: "Turismo", location: "São Paulo, SP", campaigns: 8, budget: "Médio", verified: true },
    { id: 199, name: "LATAM Brasil", category: "Turismo", location: "São Paulo, SP", campaigns: 12, budget: "Alto", verified: true },
    { id: 200, name: "Airbnb Brasil", category: "Turismo", location: "São Paulo, SP", campaigns: 14, budget: "Alto", verified: true }
  ]
};

export default function DiscoverPage({ onBack, onSignup }: DiscoverPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedNiche, setSelectedNiche] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Extrair nichos únicos dos influenciadores
  const niches = ['all', ...new Set(DATABASE.influencers.map(inf => inf.niche))];
  
  // Extrair categorias únicas das marcas
  const categories = ['all', ...new Set(DATABASE.brands.map(brand => brand.category))];

  // Filtrar resultados
  const filteredResults = useMemo(() => {
    let results: any[] = [];
    
    if (activeTab === 'all' || activeTab === 'influencers') {
      let filtered = DATABASE.influencers;
      if (selectedNiche !== 'all') {
        filtered = filtered.filter(inf => inf.niche === selectedNiche);
      }
      if (searchQuery) {
        filtered = filtered.filter(inf => 
          inf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          inf.niche.toLowerCase().includes(searchQuery.toLowerCase()) ||
          inf.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      results = [...results, ...filtered.map(item => ({ ...item, type: 'influencer' }))];
    }
    
    if (activeTab === 'all' || activeTab === 'brands') {
      let filtered = DATABASE.brands;
      if (selectedCategory !== 'all') {
        filtered = filtered.filter(brand => brand.category === selectedCategory);
      }
      if (searchQuery) {
        filtered = filtered.filter(brand => 
          brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          brand.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          brand.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      results = [...results, ...filtered.map(item => ({ ...item, type: 'brand' }))];
    }
    
    return results;
  }, [searchQuery, activeTab, selectedNiche, selectedCategory]);

  const goldTextClass = "text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600";

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-thedeal-gold selection:text-black">
      {/* HEADER PADRONIZADO */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 h-16 md:h-20 transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
          <div className="flex flex-col items-start gap-1 cursor-pointer group" onClick={onBack}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Briefcase size={18} className="text-black" />
              </div>
              <h1 className="text-lg md:text-xl font-display font-black tracking-tighter text-white uppercase leading-none">THE DEAL</h1>
            </div>
            <p className="text-[7px] md:text-[8px] font-black uppercase text-yellow-400 tracking-[0.3em] pl-0.5">Rede Social Privada</p>
          </div>
          
          <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all">
            <ArrowLeft size={14} className="text-yellow-400" />
            <span className="text-[9px] font-black uppercase tracking-widest text-white">Voltar</span>
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8 pt-32 md:pt-40">
        {/* HERO SECTION */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-400/10 px-4 py-2 rounded-full border border-yellow-400/20 mb-6 animate-fade-in">
            <Globe className="w-4 h-4 text-yellow-400" />
            <span className="text-[10px] font-black text-yellow-400 uppercase tracking-widest">Base de Dados Alpha v3.0</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter leading-[0.9]">
            <span className={goldTextClass}>DESCUBRA</span> QUEM ESTÁ <br/>NO THE DEAL
          </h1>
          <p className="text-thedeal-gray400 text-sm md:text-base max-w-2xl mx-auto font-medium">
            Explore os top 100 influenciadores e as 100 maiores marcas do Brasil. Dados públicos para você conhecer o ecossistema.
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-thedeal-gray600" size={22} />
            <input
              type="text"
              placeholder="Buscar por nome, nicho, categoria ou localização..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950 border border-white/10 rounded-2xl pl-16 pr-6 py-5 text-white placeholder:text-white/20 focus:outline-none focus:border-yellow-400/50 transition-all font-bold"
            />
          </div>
        </div>

        {/* TABS & FILTERS */}
        <div className="mb-10 space-y-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest whitespace-nowrap transition-all ${
                activeTab === 'all' 
                  ? 'bg-white text-black shadow-xl shadow-white/10' 
                  : 'bg-zinc-900 text-thedeal-gray600 hover:bg-zinc-800'
              }`}
            >
              Todos ({DATABASE.influencers.length + DATABASE.brands.length})
            </button>
            <button
              onClick={() => setActiveTab('influencers')}
              className={`px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest whitespace-nowrap transition-all ${
                activeTab === 'influencers' 
                  ? 'bg-white text-black shadow-xl shadow-white/10' 
                  : 'bg-zinc-900 text-thedeal-gray600 hover:bg-zinc-800'
              }`}
            >
              Influenciadores ({DATABASE.influencers.length})
            </button>
            <button
              onClick={() => setActiveTab('brands')}
              className={`px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest whitespace-nowrap transition-all ${
                activeTab === 'brands' 
                  ? 'bg-white text-black shadow-xl shadow-white/10' 
                  : 'bg-zinc-900 text-thedeal-gray600 hover:bg-zinc-800'
              }`}
            >
              Marcas ({DATABASE.brands.length})
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="ml-auto px-6 py-4 rounded-xl font-black text-xs uppercase tracking-widest whitespace-nowrap bg-zinc-950 border border-white/10 text-thedeal-gray400 hover:text-white flex items-center gap-3 transition-all"
            >
              <Filter size={18} />
              Filtros
            </button>
          </div>

          {/* FILTROS EXPANSÍVEIS */}
          {showFilters && (
            <div className="bg-zinc-950 border border-white/5 rounded-[2rem] p-8 space-y-6 animate-fade-in shadow-2xl">
              <div className="grid md:grid-cols-2 gap-8">
                {(activeTab === 'all' || activeTab === 'influencers') && (
                  <div className="space-y-3">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-thedeal-gray600 ml-2">
                      Nicho Profissional
                    </label>
                    <div className="relative">
                      <select
                        value={selectedNiche}
                        onChange={(e) => setSelectedNiche(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-sm font-bold text-white focus:outline-none focus:border-yellow-400/50 appearance-none transition-all cursor-pointer"
                      >
                        {niches.map(niche => (
                          <option key={niche} value={niche}>
                            {niche === 'all' ? 'Todos os Nichos' : niche}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-thedeal-gray600 pointer-events-none" />
                    </div>
                  </div>
                )}
                
                {(activeTab === 'all' || activeTab === 'brands') && (
                  <div className="space-y-3">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-thedeal-gray600 ml-2">
                      Categoria de Mercado
                    </label>
                    <div className="relative">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-sm font-bold text-white focus:outline-none focus:border-yellow-400/50 appearance-none transition-all cursor-pointer"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>
                            {cat === 'all' ? 'Todas as Categorias' : cat}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-thedeal-gray600 pointer-events-none" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* RESULTS COUNT */}
        <div className="mb-8 flex items-center gap-3">
          <div className="h-px bg-white/10 flex-1"></div>
          <p className="text-[10px] text-thedeal-gray600 font-black uppercase tracking-[0.3em]">
            Exibindo {filteredResults.length} Ativos de Performance
          </p>
          <div className="h-px bg-white/10 flex-1"></div>
        </div>

        {/* RESULTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.map(item => (
            <div key={item.id} className="bg-zinc-950 border border-white/5 rounded-[2rem] p-8 hover:border-yellow-400/30 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                {item.type === 'influencer' ? <Users size={120} /> : <Building2 size={120} />}
              </div>

              {item.type === 'influencer' ? (
                <div className="space-y-6 relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center font-black text-2xl text-yellow-400 shadow-xl group-hover:scale-110 transition-transform">
                      {item.name.charAt(0)}
                    </div>
                    {item.verified && (
                      <div className="bg-yellow-400/10 p-2 rounded-xl border border-yellow-400/20">
                        <CheckCircle2 size={18} className="text-yellow-400" />
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight truncate group-hover:text-yellow-400 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-[10px] text-thedeal-gray600 uppercase tracking-widest font-black mt-1">
                      {item.niche}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                    <div>
                      <p className="text-[9px] font-black text-thedeal-gray600 uppercase tracking-widest mb-1">Seguidores</p>
                      <p className="text-sm font-bold text-white">{item.followers}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-thedeal-gray600 uppercase tracking-widest mb-1">Engajamento</p>
                      <p className="text-sm font-bold text-yellow-400">{item.engagement}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[9px] text-thedeal-gray600 font-black uppercase tracking-widest">
                    <MapPin size={10} />
                    <span>{item.location}</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center font-black text-2xl text-blue-400 shadow-xl group-hover:scale-110 transition-transform">
                      {item.name.charAt(0)}
                    </div>
                    {item.verified && (
                      <div className="bg-blue-400/10 p-2 rounded-xl border border-blue-400/20">
                        <Award size={18} className="text-blue-400" />
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight truncate group-hover:text-blue-400 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-[10px] text-thedeal-gray600 uppercase tracking-widest font-black mt-1">
                      {item.category}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                    <div>
                      <p className="text-[9px] font-black text-thedeal-gray600 uppercase tracking-widest mb-1">Campanhas</p>
                      <p className="text-sm font-bold text-white">{item.campaigns}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-thedeal-gray600 uppercase tracking-widest mb-1">Budget</p>
                      <p className="text-sm font-bold text-blue-400 uppercase">{item.budget}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[9px] text-thedeal-gray600 font-black uppercase tracking-widest">
                    <MapPin size={10} />
                    <span>{item.location}</span>
                  </div>
                </div>
              )}
              
              <button className="w-full mt-8 bg-white/5 border border-white/10 group-hover:bg-white group-hover:text-black py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                Ver Performance Alpha
              </button>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filteredResults.length === 0 && (
          <div className="text-center py-32 space-y-6">
            <div className="w-24 h-24 bg-zinc-950 border border-white/10 rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <Search size={40} className="text-thedeal-gray700" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">Nenhum ativo encontrado</h3>
              <p className="text-thedeal-gray600 text-sm font-medium">Tente ajustar seus filtros ou termo de busca no terminal.</p>
            </div>
          </div>
        )}

        {/* CTA SECTION */}
        <div className="mt-24 bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden group shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none"></div>
          
          <div className="relative z-10 space-y-10">
            <h2 className="text-4xl md:text-6xl font-display font-black mb-4 uppercase tracking-tighter leading-none">
              QUER ACESSAR OS CONTATOS <br/>E <span className="text-yellow-400">FECHAR DEALS?</span>
            </h2>
            <p className="text-thedeal-gray400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
              Cadastre-se na rede privada do The Deal e tenha acesso completo aos perfis validados, contatos diretos e oportunidades exclusivas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onSignup}
                className="bg-yellow-400 text-black font-black px-12 py-6 rounded-2xl uppercase text-xs tracking-[0.2em] hover:scale-105 transition-all shadow-2xl shadow-yellow-400/20 active:scale-95"
              >
                Criar Conta Gratuita
              </button>
              <button
                onClick={onBack}
                className="bg-white/5 border border-white/10 text-white font-black px-12 py-6 rounded-2xl uppercase text-xs tracking-[0.2em] hover:bg-white/10 transition-all"
              >
                Voltar ao Início
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-20 border-t border-white/5 text-center opacity-30">
        <p className="text-[9px] font-black text-thedeal-gray700 uppercase tracking-[0.6em]">
          THE DEAL NETWORK • © 2025 • TODOS OS DIREITOS RESERVADOS
        </p>
      </footer>
    </div>
  );
}
