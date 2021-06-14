-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-06-2021 a las 10:02:45
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestion`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bloque`
--

CREATE TABLE `bloque` (
  `idbloque` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` varchar(255) NOT NULL,
  `cuestionario_idcuestionario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `bloque`
--

INSERT INTO `bloque` (`idbloque`, `name`, `description`, `cuestionario_idcuestionario`) VALUES
(4, 'coche 10 ruedas', 'camiones', 1),
(5, 'coches de 7 ruedas', 'carromatos', 1),
(8, 'react', 'libreria de react', 2),
(9, 'php 8', 'código abierto', 2),
(18, 'javascript', 'lenguaje de programación', 2),
(25, 'coches 4 ruedas', 'coche', 1),
(69, 'motos de 3 ruedas', 'triciclos', 3),
(70, 'bloque 1', 'jkjkjkj', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuestionario`
--

CREATE TABLE `cuestionario` (
  `idcuestionario` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` varchar(255) NOT NULL,
  `category` varchar(45) NOT NULL,
  `usuario_idusuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cuestionario`
--

INSERT INTO `cuestionario` (`idcuestionario`, `name`, `description`, `category`, `usuario_idusuario`) VALUES
(1, 'coches', 'citroen', 'categoria 1', 1),
(2, 'programación', 'código ', 'categoria 3', 1),
(3, 'motos', '250 ccc', 'categoria 4', 1),
(4, 'cues4', 'html', 'categoria 1', 2),
(7, 'cues5', 'javascript', 'categoria 2', 2),
(57, 'motos', 'motos 250cc', 'categoria 1', 58);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pregunta`
--

CREATE TABLE `pregunta` (
  `idpregunta` int(11) NOT NULL,
  `title` varchar(45) NOT NULL,
  `description` varchar(255) NOT NULL,
  `bloque_idbloque` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `pregunta`
--

INSERT INTO `pregunta` (`idpregunta`, `title`, `description`, `bloque_idbloque`) VALUES
(5, 'año de fabricación', 'año de fabricación', 4),
(6, 'otro', 'nuevo', 5),
(7, 'cuanta puertas', 'números de puertas ', 4),
(8, 'pegun23', 'otra', 5),
(18, 'que es react', 'definición de react', 8),
(51, 'partes de react', 'partes de react', 8),
(52, 'que es javascritt', 'definición de javascript', 18),
(53, 'primer triciclo', 'creación del primer triciclo', 69),
(54, 'pregunta 1', 'lklklklk', 70),
(56, 'fdsfsfsdfsfsf', 'lklklk', 4),
(58, 'klklklkl', 'mllklklkl', 4),
(59, 'klkklkl', 'lklklkl', 4),
(66, 'ñllllñl', 'lñlñlñ', 4),
(67, 'jkkjkj', 'jkjkjkj', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuesta`
--

CREATE TABLE `respuesta` (
  `idrespuesta` int(11) NOT NULL,
  `text` varchar(45) NOT NULL,
  `isCorrect` varchar(5) NOT NULL,
  `pregunta_idpregunta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `respuesta`
--

INSERT INTO `respuesta` (`idrespuesta`, `text`, `isCorrect`, `pregunta_idpregunta`) VALUES
(3, 'año 1990', 'false', 5),
(4, 'año 1993', 'false', 5),
(5, 'año 1999', 'true', 5),
(47, 'año 2000', 'false', 5),
(58, 'php en un libro', 'false', 18),
(59, 'una libreria', 'true', 18),
(60, 'un plato de comida', 'false', 18),
(61, 'una marca de coche', 'false', 18),
(100, '12 puertas', 'false', 7),
(101, '4 puertas', 'false', 7),
(102, '7 puertas', 'true', 7),
(103, '6 puertas', 'false', 7),
(104, 'es un libro', 'false', 52),
(105, 'es un lenguaje de programación', 'true', 52),
(106, 'descatalogado', 'false', 52),
(107, 'plato de comida', 'false', 52),
(108, '1900', 'false', 53),
(109, '1700', 'false', 53),
(110, '1950', 'true', 53),
(111, '2000', 'false', 53),
(112, 'lkklklklk', 'false', 54),
(113, 'lklklklk', 'true', 54),
(114, 'lklklkl', 'false', 54),
(115, 'klklklklk', 'false', 54);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idusuario` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idusuario`, `email`, `password`) VALUES
(1, 'correo1@correo.com', '$2y$10$LkcIXSYUi/.H.JgDe99ba.A2HnhXPZRhTPtqbBjFYJOVOERqqeI4W'),
(2, 'correo2@correo.com', '$2y$10$ZW2hY5J9rfzDTNHDzsMl1uhDgqVsF9Y6cABm4o2RCL2Sq9AF2PIf6'),
(58, 'jime@correo.com', '$2y$10$EynYPczFXcLz47JFAVFkHO.o.sIUjj2vz82h7eYXpvvUdYg73pd5q'),
(63, 'coreo@coreo.com', '$2y$10$lBpcX4L.wOvPbqvakMhsD.p1WsVf6OzHuRKG5i8UT/uBCp0WcZbQm');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bloque`
--
ALTER TABLE `bloque`
  ADD PRIMARY KEY (`idbloque`),
  ADD KEY `fk_bloque_cuestionario1_idx` (`cuestionario_idcuestionario`);

--
-- Indices de la tabla `cuestionario`
--
ALTER TABLE `cuestionario`
  ADD PRIMARY KEY (`idcuestionario`),
  ADD KEY `fk_cuestionario_usuario_idx` (`usuario_idusuario`);

--
-- Indices de la tabla `pregunta`
--
ALTER TABLE `pregunta`
  ADD PRIMARY KEY (`idpregunta`),
  ADD KEY `fk_pregunta_bloque1_idx` (`bloque_idbloque`);

--
-- Indices de la tabla `respuesta`
--
ALTER TABLE `respuesta`
  ADD PRIMARY KEY (`idrespuesta`),
  ADD KEY `fk_respuesta_pregunta1_idx` (`pregunta_idpregunta`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idusuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bloque`
--
ALTER TABLE `bloque`
  MODIFY `idbloque` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT de la tabla `cuestionario`
--
ALTER TABLE `cuestionario`
  MODIFY `idcuestionario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT de la tabla `pregunta`
--
ALTER TABLE `pregunta`
  MODIFY `idpregunta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT de la tabla `respuesta`
--
ALTER TABLE `respuesta`
  MODIFY `idrespuesta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=120;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idusuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `bloque`
--
ALTER TABLE `bloque`
  ADD CONSTRAINT `fk_bloque_cuestionario1` FOREIGN KEY (`cuestionario_idcuestionario`) REFERENCES `cuestionario` (`idcuestionario`);

--
-- Filtros para la tabla `cuestionario`
--
ALTER TABLE `cuestionario`
  ADD CONSTRAINT `fk_cuestionario_usuario` FOREIGN KEY (`usuario_idusuario`) REFERENCES `usuario` (`idusuario`);

--
-- Filtros para la tabla `pregunta`
--
ALTER TABLE `pregunta`
  ADD CONSTRAINT `fk_pregunta_bloque1` FOREIGN KEY (`bloque_idbloque`) REFERENCES `bloque` (`idbloque`);

--
-- Filtros para la tabla `respuesta`
--
ALTER TABLE `respuesta`
  ADD CONSTRAINT `fk_respuesta_pregunta1` FOREIGN KEY (`pregunta_idpregunta`) REFERENCES `pregunta` (`idpregunta`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
