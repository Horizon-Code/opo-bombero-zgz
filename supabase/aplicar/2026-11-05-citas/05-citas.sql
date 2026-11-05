-- Lote 5: amplía la cita (texto literal que sigue en el bloque del corpus) de 160 preguntas.
-- Guardas: solo si la cita actual acaba exactamente como la que se amplió, y no está editada a mano.
with u as (
  update public.banco_preguntas b set cita = b.cita || v.ext, editada_at = now()
  from (values
('C039-0011',' TIEMPO que tarda la IGNICIÓN;',' esta se produce cuando la superficie genera gases suficientes para inflamarse con una PEQUEÑA LLAMA.'),
('C039-0021','CIA TÉRMICA BAJA (factor kρc);',' con kρc ALTO se calientan LENTAMENTE.'),
('C039-0023','DO arde pasados los 3 MINUTOS;',' el CONTRACHAPADO, de kρc mucho menor, en apenas 50 SEGUNDOS.'),
('C039-0034','TAL de la superficie que arde;',' más frío que los gases, RALENTIZA el proceso, al menos al principio.'),
('C039-0045','VELOCIDAD INICIAL de la llama;',' también se da bajo el cojín, pues las llamas suelen iniciarse lejos de donde se producen los gases de pirólisis.'),
('C039-0049','a por el calor por CONVECCIÓN;',' la del MEDIO por la RADIACIÓN de la llama (más ancha con la altura, más radiación); la SUPERIOR aún sin incendiar.'),
('C039-0054','uele AUMENTAR con la DENSIDAD;',' la densidad determina casi siempre la rapidez: material PESADO más lento que LIGERO; en ESPUMAS SINTÉTICAS las llamas pueden ser extremadamente rápidas.'),
('C039-0055','l PESADO más lento que LIGERO;',' en ESPUMAS SINTÉTICAS las llamas pueden ser extremadamente rápidas.'),
('C039-0059',' tamaño en el mismo intervalo:',' si 25 cm tardan 30 s en llegar a 50 cm, para 1 m harán falta unos 2 MINUTOS (pared homogénea, medida aproximada).'),
('C039-0060',' y la VERTICAL ASCENDENTE (3);',' por la PARTE SUPERIOR de una horizontal (4) o HACIA ABAJO en una vertical (1) la llama «SE DESLIZA», más lenta.'),
('C039-0083','l conductor) → MENOS pérdidas;',' el calor se emplea en aumentar la pirólisis.'),
('C039-0085','DE HUECOS en los cerramientos;',' el incendio busca el OXÍGENO.'),
('C039-0086','busca el OXÍGENO. Cuatro vías:','
— ABERTURAS EXISTENTES (puertas, ventanas, huecos de cubierta abiertos).
— Huecos por ROTURA de ventanas o zonas acristaladas.
— Huecos por DETERIORO de los cerramientos: fallo estructural, grietas o aumento excesivo de temperatura en la CARA NO EXPUESTA por conducción.
— Huecos por FALLO de los PASOS DE INSTALACIONES (conducción de servicios) a través de los cerramientos, por el flujo de gases ca'),
('C039-0091',' el techo y crecen en volumen;',' si encuentran o se les practica una abertura, salen por ella.'),
('C039-0094',' de su desarrollo son IGUALES;',' lo que los diferencia son las condiciones particulares («personalidad propia»).'),
('C039-0109','AS establecieron CINCO etapas:',' IGNICIÓN · CRECIMIENTO · FLASHOVER · INCENDIO TOTALMENTE DESARROLLADO · DECAIMIENTO.'),
('C039-0135','permanecer un PERIODO PEQUEÑO;',' una alta concentración de combustible que asciende hace que las llamas alcancen la PARTE INFERIOR de la capa.'),
('C039-0139','teriales del TECHO pirolizan);',' 2. la COMBUSTIÓN INCOMPLETA del foco.'),
('C039-0141',' EXCESO de gases combustibles:',' las LLAMAS ESCAPAN por los huecos de ventilación.'),
('C039-0145',' TORRES GEMELAS de Nueva York;',' importan sobre todo en edificios que no pueden evacuarse por completo y para que los servicios de extinción puedan CONFIAR en la estructura.'),
('C039-0151','istencia a la rotura a 500 °C;',' el HORMIGÓN mantiene alrededor del 75 % a 500 °C; la MADERA pierde espesor por la CAPA DE CARBÓN y se vuelve frágil: a menor sección, menor resistencia.'),
('C039-0152','e alrededor del 75 % a 500 °C;',' la MADERA pierde espesor por la CAPA DE CARBÓN y se vuelve frágil: a menor sección, menor resistencia.'),
('C039-0176','s suficientes para inflamarse,',' pero las personas SIN EQUIPO DE PROTECCIÓN RESPIRATORIA podrían morir por los gases tóxicos.'),
('C039-0179','impacto de calor considerable;',' el recinto lleno de gases con gran cantidad de NO QUEMADOS.'),
('C039-0185','n, p. ej. al ABRIR UNA PUERTA;',' necesitan temperatura ALTA, habitualmente 500 a 600 °C (supera la «temperatura de ignición térmica»).'),
('C039-0188','lmente con LLAMAS DE DIFUSIÓN;',' vuelve a la etapa inicial y puede evolucionar a TOTALMENTE DESARROLLADO si la abertura es suficiente; la evolución puede ACELERARSE (temperatura de los gases superior a la normal).'),
('C039-0201',' ser el FACTOR MÁS IMPORTANTE;',' la velocidad de combustión la determina el FLUJO DE AIRE que entra, que depende del tamaño y distribución de los huecos.'),
('C039-0206','menta la tasa de calor (15.2);',' con ventilación, la entrada de aire puede reanudar el desarrollo, autoinflamar los gases o provocar un backdraught (15.3 y Tema 16).'),
('C039-0208','ducen por carencia de oxígeno;',' desarrollo en el 16.1).'),
('C039-0224','as depende de CUATRO FACTORES:',' la inercia térmica kρc · la dirección de la superficie · la geometría de la superficie · el entorno.'),
('C039-0225','ARED QUE ARDE, tres secciones:',' la del FONDO dominada por el calor por CONVECCIÓN; la del MEDIO por la RADIACIÓN de la llama (más ancha con la altura, más radiación); la SUPERIOR aún sin incendiar.'),
('C039-0226','busca el OXÍGENO. Cuatro vías:','
— ABERTURAS EXISTENTES (puertas, ventanas, huecos de cubierta abiertos).
— Huecos por ROTURA de ventanas o zonas acristaladas.
— Huecos por DETERIORO de los cerramientos: fallo estructural, grietas o aumento excesivo de temperatura en la CARA NO EXPUESTA por conducción.
— Huecos por FALLO de los PASOS DE INSTALACIONES (conducción de servicios) a través de los cerramientos, por el flujo de gases ca'),
('C039-0227','os equipos, CUATRO ESCENARIOS:',' el incendio se AUTO-EXTINGUE · REANUDA su desarrollo · los gases se AUTOINFLAMAN · se produce un BACKDRAUGHT (este último, en el Tema 16).'),
('C039-0229','istencia a la rotura a 500 °C;',' el HORMIGÓN mantiene alrededor del 75 % a 500 °C; la MADERA pierde espesor por la CAPA DE CARBÓN y se vuelve frágil: a menor sección, menor resistencia.'),
('C039-0230','e alrededor del 75 % a 500 °C;',' la MADERA pierde espesor por la CAPA DE CARBÓN y se vuelve frágil: a menor sección, menor resistencia.'),
('C039-0234',' TIEMPO que tarda la IGNICIÓN;',' esta se produce cuando la superficie genera gases suficientes para inflamarse con una PEQUEÑA LLAMA.'),
('C039-0239','uele AUMENTAR con la DENSIDAD;',' la densidad determina casi siempre la rapidez: material PESADO más lento que LIGERO; en ESPUMAS SINTÉTICAS las llamas pueden ser extremadamente rápidas.'),
('C039-0242','berturas existentes o creadas;',' si no pueden salir, se acumulan en el techo y crecen en volumen; si encuentran o se les practica una abertura, salen por ella.'),
('C039-0250','iendo gases durante un tiempo:',' se acumulan GRANDES CANTIDADES de gases de pirólisis.'),
('C039-0259','OMPE UNA VENTANA por el calor:',' los gases salen por la parte SUPERIOR de la abertura y el aire entra por la INFERIOR (elevación del plano neutro, dice el texto); la corriente alimenta el foco, que crece; las llamas alcanzan el cojín y el FRENTE DE LLAMA atraviesa la habitación.'),
('C039-0268',' para ser quemado es LIMITADA;',' hay AIRE SUFICIENTE, y es la cantidad de COMBUSTIBLE la que limita la velocidad de crecimiento.'),
('C040-0036','conocer CONTENIDO y GEOMETRÍA;',' de noche o con distinta iluminación el problema se agrava.'),
('C040-0187','locidad, expansión más rápida;',' depende de la SUSTANCIA y de la POSICIÓN respecto al punto ESTEQUIOMÉTRICO, donde es MÁXIMA.'),
('C040-0274',' directamente la FASE GASEOSA;',' desarrollada a principios de los años 80 en SUECIA, hoy ampliamente adoptada.'),
('C040-0310',' genera gases con no quemados;',' si se acumulan, la entrada de aire al practicar una abertura puede dar una DEFLAGRACIÓN SÚBITA que atraviesa el apartamento y sale por la abertura.'),
('C040-0315','; se forma y engrosa el cojín;',' el aire arrastrado contiene cada vez más no quemados y menos oxígeno → combustión INCOMPLETA.'),
('C040-0316','y los no quemados se acumulan;',' el incendio puede volverse LATENTE o reanudarse espontáneamente según el combustible y la abertura.'),
('C040-0317','atmósfera RICA EN COMBUSTIBLE;',' el TIPO de combustible es crucial (algunos emiten productos de pirólisis con más facilidad).'),
('C040-0331',', mayor el aumento de presión;',' en un backdraught normalmente solo se implica una PEQUEÑA cantidad premezclada.'),
('C040-0334','oxígeno y acumula no quemados;',' incluso parece AUTOEXTINGUIDO.'),
('C040-0349','DIO QUE REANUDA SU DESARROLLO:',' las llamas pueden parecer nacer en la abertura pero haberse originado BASTANTE DENTRO; difícil determinar cuál es.'),
('C040-0361','pacio delante de los bomberos;',' se genera PRESIÓN NEGATIVA; los bomberos no sufren QUEMADURAS por vapor y mejoran las probabilidades de las víctimas de otros compartimentos.'),
('C041-0013','ses; cono que llegue al cojín;',' a veces basta mantener 150 a 300 l/min, aunque puede hacer falta bastante más.'),
('C041-0087','iones, disposición, víctimas);',' entrar con pulsaciones largas o cortas dejando pasar el MENOR AIRE posible; repetir cuanto haga falta.'),
('C041-0088','ones CORTAS SOBRE LAS CABEZAS;',' seguir con pulsaciones en la zona de sobrepresión, cada una a una POSICIÓN DIFERENTE para abarcar todo el volumen.'),
('C041-0140','o los diferencia la densidad):',' un fluido que pasa en un conducto cerrado de una SECCIÓN MAYOR a una MENOR AUMENTA SU VELOCIDAD y DISMINUYE SU PRESIÓN; si en ese punto desemboca otro conducto, se ASPIRA su fluido.'),
('C041-0143','fluido tiene TRES componentes:',' CINÉTICA (velocidad) · POTENCIAL GRAVITACIONAL (altura) · DE FLUJO (presión).'),
('C041-0159',' por la diferencia de presión;',' calor y productos se reemplazan por AIRE LIMPIO (fuente: NIST TIR 7412).'),
('C041-0166','s a 45 y de cada una dos a 25:',' cuantas más mangueras, más PÉRDIDAS DE CARGA y menos caudal en cada una; con solo dos de 45, pérdidas mínimas.'),
('C041-0176','ntanas de los PATIOS DE LUCES;',' acabada una planta se cierra y se sigue con la superior.'),
('C041-0192',' la FASE DE ATAQUE? Preguntas:',' cuándo aplicar la VPP y CUÁNDO NO; dónde colocar el ventilador y la salida; si aporta oxígeno y acelera el incendio; consecuencias para quien quede ENTRE EL INCENDIO Y LA SALIDA; construcciones donde no se pueda usar.'),
('C041-0198','ITERA con dos camas completas;',' TERMOPARES TIPO K, SONDAS BIDIRECCIONALES y cámaras de vídeo.'),
('C041-0203','zó a los 345 s de la ignición;',' en el de VPP el ventilador arrancó 5 s después de abrir la ventana y paró a los 1.380 s.'),
('C041-0214','on VPP frente a 12 m/s con VN;',' el flujo unidireccional fuera fue inmediato, pero el continuo desde la entrada tardó.'),
('C041-0219','MBUSTIÓN en el ataque inicial:',' importa practicar la abertura CERCA DEL FOCO (tiro natural).'),
('C041-0225','poner en marcha el ventilador;',' ese tiempo varía con el edificio, el incendio y el ventilador.'),
('C041-0232','ESURIZAR EL HUECO DE ESCALERA;',' variables: tamaños, ángulos, distancias, número y orientación de ventiladores, puertas abiertas y aberturas de ventilación.'),
('C041-0235','vencia en edificios de altura;',' es posible PRESURIZAR la escalera contra el humo e IGUALAR o MEJORAR los SISTEMAS FIJOS DE CONTROL DE HUMOS con la configuración adecuada (tamaño, distancia, ángulo, posición dentro o fuera, número y alineación).'),
('C042-0119',' 1568 (norma más actualizada):','
- BAJA EXPANSIÓN (< 20): DENSAS y con ALTO CONTENIDO DE AGUA. MISMO ALCANCE DE PROYECCIÓN QUE EL AGUA.
- MEDIA EXPANSIÓN (20-200): se obtiene un COLCHÓN DE ESPUMA que llena grandes superficies. ALCANCE MENOR QUE EL AGUA (5-6 METROS).
- ALTA EXPANSIÓN (> 200): espumas MUY LIGERAS que llenan rápidamente GRANDES VOLÚMENES.'),
('C042-0147','mediante DOS TIPOS DE ESPUMAS:','
- ÓLEO-FÓBICA: con ella se consigue que el agua REPELA CUALQUIER LÍQUIDO APOLAR (por ejemplo, casi todos los combustibles derivados del petróleo), evitando que la espuma contenga restos de combustible. FUNCIONA CON ESPUMÓGENOS DE CLASE B, destinados a la extinción de combustibles líquidos, sobre todo HIDROCARBUROS derivados del petróleo.
- ÓLEO-FÍLICA: con ella se consigue una AFINIDAD CON LOS PRODUCTOS DE…'),
('C042-0187','temas de extinción por espuma:','
- NFPA 403: norma para servicios en AEROPUERTOS para rescate y combate de incendios en AERONAVES.
- NFPA 850: sobre diseño de PLANTAS DE GENERACIÓN ELÉCTRICA.'),
('C042-0188','NORMATIVAS DE DISEÑO NFPA:','
- NFPA 30: código de LÍQUIDOS INFLAMABLES Y COMBUSTIBLES.
- NFPA 16: norma para la instalación de ROCIADORES AGUA-ESPUMA y sistemas aspersores de agua-espuma.
- NFPA 11: sistemas de BAJA, MEDIA Y ALTA EXPANSIÓN.'),
('C042-0227','S EFICAZ en fuegos de CLASE A.',' Su uso en fuegos TIPO F QUEDA TOTALMENTE DESACONSEJADO, por la proyección de aceite en llamas que podría producir.'),
('C042-0244',' de forma particular cada una.',' INCLUSO UN AGENTE ADECUADO PARA CIERTOS FUEGOS DE CLASE D PUEDE RESULTAR PELIGROSO CUANDO SE EMPLEA SOBRE EL FUEGO DE OTRO METAL; por lo tanto son AGENTES EXTINTORES ESPECÍFICOS PARA FUEGOS TIPO D CONCRETOS.'),
('C042-0306','LOS MÁS EMPLEADOS FUERON:','
- HALÓN 1211 (diflúor clorobromo metano).
- HALÓN 1301 (triflúor bromometano).'),
('C042-0308','ica la composición del agente:','
- PRIMER DÍGITO: átomos de CARBONO.
- SEGUNDO: átomos de FLÚOR.
- TERCERO: átomos de CLORO.
- CUARTO: átomos de BROMO.
- QUINTO, de existir: átomos de YODO.'),
('C042-0317',' de punto de inflamación bajo:',' según manuales, no es efectiva sobre líquidos inflamables cuyo PUNTO DE INFLAMACIÓN SEA INFERIOR A 38 ºC.'),
('C042-0323',' principalmente a DOS MOTIVOS:','
- La FRICCIÓN entre el agua y las paredes de la manguera: supone UN 10 % de la pérdida total.
- El FLUJO TURBULENTO en el interior de la manguera cuando el agua circula a elevadas velocidades: supone aproximadamente EL 90 % de la pérdida de presión total.'),
('C042-0349','as siguientes características:','
TABLA 3.'),
('C042-0350',' PELÍCULA ACUOSA ANTI-ALCOHOL:',' para evitar que ciertos líquidos (denominados POLARES, como el ALCOHOL, que son SOLUBLES EN EL AGUA) destruyan la espuma, se AÑADEN POLÍMEROS al espumógeno para que se cree UNA CAPA FÍSICA, sobre la cual se sigue echando más espuma.'),
('C042-0353',' utilizan en FUEGOS DE CLASE A',' y sobre LÍQUIDOS COMBUSTIBLES E INFLAMABLES (ALMACENES, HANGARES…).'),
('C042-0362','S EFICAZ en fuegos de CLASE A.',' Su uso en fuegos TIPO F QUEDA TOTALMENTE DESACONSEJADO, por la proyección de aceite en llamas que podría producir.'),
('C042-0367','Se diferencian DOS TIPOS:','
- PREPARADOS: fabricados y aplicados mediante un EXTINTOR PORTÁTIL. Actúan PRINCIPALMENTE POR INHIBICIÓN.
- NO PREPARADOS: los que podemos encontrar IN SITU en el incendio: ARENA SECA, SILICATOS DE CIRCONIO, DOLOMITA, ClNa, POLVOS DE TALCO, LIMADURAS DE HIERRO. Se suelen aplicar sobre SUPERFICIES HORIZONTALES, CUBRIENDO LAS LLAMAS, y actúan PRINCIPALMENTE POR SOFOCACIÓN.'),
('C042-0376','as está expuesto a las llamas;',' se evita mediante un PERIODO DE APLICACIÓN CORTO, aplicándolos muy rápido y en gran cantidad para una extinción instantánea.'),
('C043-0027',' HIDROCARBURO HALOGENADO (R-X:',' composición química TOTALMENTE ANÁLOGA A LA DE LOS PROHIBIDOS HALONES, pero con alguna diferencia atómica que hace que NO PRODUZCAN CFCs y por lo tanto NO DESTRUYAN LA CAPA DE OZONO).'),
('C043-0288','or · efectiva en fuegos tipo A',' · barata · abundante · no tóxica.'),
('C044-0001','O POTÁSICO y CLORURO POTÁSICO;',' según el producto, algunos sirven en fuegos de METALES o en EQUIPOS ELÉCTRICOS.'),
('C044-0002','O POTÁSICO y CLORURO POTÁSICO;',' según el producto, algunos sirven en fuegos de METALES o en EQUIPOS ELÉCTRICOS.'),
('C044-0004',' con gran superficie expuesta;',' ENFRIAMIENTO de las llamas, la energía que restan e INHIBICIÓN QUÍMICA.'),
('C044-0006','NIVERSAL (materiales fibrosos,',' líquidos y gases inflamables y equipos bajo tensión) y POLVOS ESPECIALES (líquidos inflamables, equipamiento eléctrico o METALES combustibles).'),
('C044-0035','S en grandes naves de PINTURA,',' centros de SERVIDORES informáticos o salas de almacenamiento de LÍQUIDOS INFLAMABLES («equipados con sistemas de rociadores», dice el manual).'),
('C044-0042','LÓN 1301, abrió una nueva era;',' aún disponible en algunas INSTALACIONES MILITARES y AERONAVES.'),
('C045-0028','sión inicial se clasifican en:','
- ALTA PRESIÓN: presión inicial SUPERIOR A 18 ATMÓSFERAS. Se usa en mangueras de pequeño diámetro (25 mm), que pueden ser semirrígidas o flexibles.
- MEDIA PRESIÓN: presión de trabajo ENTRE 5 Y 18 ATMÓSFERAS. Es el rango que se puede llegar a aplicar en cualquier tendido de mangueras planas durante la extinción. Más común en diámetros mayores (45 y 70 mm) y en lanzamonitores.
- BAJA PRESIÓN: presiones INFERIORES A…'),
('C045-0049','se necesitan grandes caudales;',' en ese caso SUELEN SER NECESARIOS DOS BOMBEROS EN PUNTA DE LANZA para soportar la fuerza de reacción.'),
('C045-0080','ADOS: «ARMTEX» (color GRANATE;',' caucho sintético resistente a abrasión, temperatura, productos químicos y envejecimiento, refuerzo textil de fibras sintéticas y pared interior que minimiza la resistencia al paso del agua) y «BLINDEX» (idéntica más una capa de CAUCHO RLH que aumenta su resistencia).'),
('C045-0095',' la bomba a un punto distante;',' resiste PRESIÓN INTERIOR POSITIVA y NO SIRVE PARA ASPIRAR porque al ser flexible se COLAPSA.'),
('C045-0096','as pero costosas de mantener);',' CUBIERTAS (de lino con cubierta exterior de caucho, más resistentes al ataque de agentes químicos o biológicos, fáciles de limpiar); de DOBLE CHAQUETA (lino y caucho más una capa exterior de fibra textil; más resistentes en intervenciones PETROQUÍMICAS); FORESTAL (recubrimiento exterior resistente a brasas y permeabilidad mínima: el agua EXUDA hacia la superficie exterior humedeciéndola e impidiendo que se queme…'),
('C045-0112','9 y 23091-34/2M:1996 (Parte 4:',' descripción de procesos y aparatos para pruebas y ensayos).'),
('C045-0209','evisar roturas y deformidades;',' se transportan en el mismo armario de los tendidos, sobre útiles de nylon cilíndricos de distintos grosores adosados al armario; limpieza tras cada uso con agua, jabón y cepillo.'),
('C045-0232','PN):
- PN INFERIOR A 16 BARES:',' apartado 2 (lanzas mixtas) y apartado 3 (lanzas de chorro pleno).'),
('C045-0233','LA NORMA NO CUBRE:','
- Las LANZAS DE ESPUMA.
- Las lanzas especificadas en la EN 671 (instalaciones fijas, BIE).
- Las lanzas para manguera de POLVO.
- Las lanzas de manguera de ALTA PRESIÓN (PN mayor de 40 bares).'),
('C045-0257','ESUSO, por sus inconvenientes:','
- NO TIENE VÁLVULA DE CIERRE: no es posible cortar el chorro desde el punto de lanzamiento.
- SOLO PROYECTA CHORRO SÓLIDO, sin posibilidad de pulverización, por lo que la eficacia extintora es mínima.
- El agua a chorro produce CUANTIOSOS DESTROZOS, genera una FUERTE Y PELIGROSA REACCIÓN, y NO OFRECE NINGUNA DEFENSA AL PORTALANZA FRENTE A UN POSIBLE GOLPE DE ARIETE.'),
('C045-0297','QUE (amplitud ENTRE 30º Y 45º;',' menor alcance pero más fácil de manejar, muy útil para desplazar humos y gases, mayor absorción de calor); CORTINA DE PROTECCIÓN (apertura máxima, MÁS DE 90º; el alcance es el menor de los tres; protege al personal de las radiaciones y sirve para efectuar CORTES DE VÁLVULAS).'),
('C045-0299','cance es el menor de los tres;',' protege al personal de las radiaciones y sirve para efectuar CORTES DE VÁLVULAS).'),
('C045-0313','a antes y después de cada uso;',' retirarla si los controles no funcionan o van con dificultad, si hay desgaste excesivo, grietas, fugas o piezas rotas; comprobar que el TORNILLO DEL DEFLECTOR está apretado.'),
('C045-0358',' revisión DESPUÉS DE CADA USO;',' se transporta anclado a la salida de agua del techo o desmontado en un armario; limpieza exterior con agua y jabón NEUTRO y cepillo suave; en el interior, atención a objetos que puedan atascar los conductos (piedras, palos).'),
('C045-0382','Tipos: FIJOS y MÓVILES;',' los móviles permiten cambiar la posición de la cortina SIN MOVER EL TENDIDO de mangueras por tener la BOQUILLA GIRATORIA.'),
('C045-0416','O DE ESPUMA QUE VAN A GENERAR:','
1. LANZAS DE ESPUMA DE BAJA EXPANSIÓN.
2. LANZAS DE ESPUMA DE MEDIA EXPANSIÓN.
3. GENERADORES DE ALTA EXPANSIÓN.'),
('C046-0030','os, que se usan CONJUNTAMENTE:',' EMULSIONAR la mezcla de agua y líquido emulsor aportándole la cantidad adecuada de AIRE y lanzarla al exterior como ESPUMA COMPACTA.'),
('C046-0071','MISIBLE EN LA ENTRADA: 10 BAR;',' por encima no se produce la absorción y el agua trataría de salir al exterior, para lo que el aparato lleva una BOLA interior que se eleva e interrumpe el paso.'),
('C046-0073',' SOBRE COMBUSTIBLES DE CLASE A',' (madera, papel, tejidos, caucho).'),
('C046-0077',' SOBRE COMBUSTIBLES DE CLASE A',' (madera, papel, tejidos, caucho).'),
('C046-0085','TIPOS DE LANZA SELECCIONABLES:','
- LANZA A CHORRO LLENO: CONO DE DIÁMETRO 6 mm, usada para tener EL MÁXIMO ALCANCE Y PENETRACIÓN, pero CON UNA EXPANSIÓN MUY DÉBIL.
- LANZA DE BAJA EXPANSIÓN: con un alcance LIGERAMENTE INFERIOR a la de chorro lleno.'),
('C046-0098',' sobre combustibles de CLASE A',' (madera, papel, tejidos, caucho), y AL 1 %, 3 % o 6 % sobre fuegos de HIDROCARBUROS o LÍQUIDOS POLARES (clase B).'),
('C046-0099','tración, expansión muy débil);',' BAJA EXPANSIÓN (alcance algo inferior; extinción o destemplado con solución humectante o espumante); MEDIA EXPANSIÓN (mayor expansión; extinción, supresión de vapores en inertización o rellenado, tratamiento de linderos en forestales); PENETRACIÓN (sitios inaccesibles por medios convencionales, balas de mercancías, paja, depósitos de cereales, tabiques; aplicación más restringida).'),
('C046-0101','to de linderos en forestales);',' PENETRACIÓN (sitios inaccesibles por medios convencionales, balas de mercancías, paja, depósitos de cereales, tabiques; aplicación más restringida).'),
('C046-0102','ución humectante o espumante);',' MEDIA EXPANSIÓN (mayor expansión; extinción, supresión de vapores en inertización o rellenado, tratamiento de linderos en forestales); PENETRACIÓN (sitios inaccesibles por medios convencionales, balas de mercancías, paja, depósitos de cereales, tabiques; aplicación más restringida).'),
('C046-0116','Enjuagar con agua tras el uso;',' lavar el exterior con la manguera y la lanza de chorro lleno con la maneta del porcentaje en «OFF»; para el interior, quitar el bloque de comando del depósito, poner el tapón y abrir ligeramente la maneta del caudal.'),
('C046-0124','OS SUELEN UTILIZAR TRES TIPOS:','
1. MOTOVENTILADORES DEL TIPO TURBOVENTILADOR: utilizan MOTOR DE EXPLOSIÓN e incorporan una turbina que crea una concentración de flujo de aire con alta velocidad inicial que, junto con el gran volumen de aire entrante, produce el flujo total de ventilación.'),
('C046-0130','OS SUELEN UTILIZAR TRES TIPOS:','
1. MOTOVENTILADORES DEL TIPO TURBOVENTILADOR: utilizan MOTOR DE EXPLOSIÓN e incorporan una turbina que crea una concentración de flujo de aire con alta velocidad inicial que, junto con el gran volumen de aire entrante, produce el flujo total de ventilación.'),
('C046-0142',' DE PRECAUCIÓN EN LA REVISIÓN:','
- Usar SIEMPRE todo el equipo de protección individual, PROTEGIENDO ESPECIALMENTE LOS OJOS Y LOS OÍDOS.
- LIMPIAR EL ÁREA DE ASPIRACIÓN del ventilador de desechos.
- EVITAR PONERLO EN MARCHA EN ZONAS CERRADAS O DE VENTILACIÓN INADECUADA, debido a los gases que expulsa el motor.
- EVITAR INCLINARLO más de lo permitido por el propio equipo, para prevenir derrames de combustible.
- ANTE OLOR A GAS NA'),
('C046-0148','o con alta velocidad inicial);',' HIDROVENTILADORES (usan el agua de una motobomba para mover su turbina, generando ventilación por PRESIÓN POSITIVA; pueden PULVERIZAR AGUA añadida a la corriente de aire abriendo la llave de las toberas); ELECTROVENTILADORES (energía eléctrica; funcionan con MANGOTES de aspiración e impulsión).'),
('C046-0149','endo la llave de las toberas);',' ELECTROVENTILADORES (energía eléctrica; funcionan con MANGOTES de aspiración e impulsión).'),
('C046-0154','tubo de escape muy calientes);',' bajar la aceleración antes de reubicarlo; no poner las petacas de combustible cerca; no arrancar sin filtro de aire o con palas dañadas; no usar repuestos ajenos al fabricante; quitar el cable de la bujía al manipularlo.'),
('C046-0155',' petacas de combustible cerca;',' no arrancar sin filtro de aire o con palas dañadas; no usar repuestos ajenos al fabricante; quitar el cable de la bujía al manipularlo.'),
('C046-0157','y fuera de la zona de soplado;',' repostar en un lugar distinto al de trabajo y NUNCA ANTES DE DOS MINUTOS tras parar el motor; guantes siempre (cilindro y tubo de escape muy calientes); bajar la aceleración antes de reubicarlo; no poner las petacas de combustible cerca; no arrancar sin filtro de aire o con palas dañadas; no usar repuestos ajenos al fabricante; quitar el cable de la bujía al manipularlo.'),
('C046-0158','ante olor a GAS NATURAL O GLP;',' manos, pies, ropa y pelo fuera de las partes móviles y fuera de la zona de soplado; repostar en un lugar distinto al de trabajo y NUNCA ANTES DE DOS MINUTOS tras parar el motor; guantes siempre (cilindro y tubo de escape muy calientes); bajar la aceleración antes de reubicarlo; no poner las petacas de combustible cerca; no arrancar sin filtro de aire o con palas dañadas; no usar repuestos ajenos al fabricante;…'),
('C046-0159','esechos el área de aspiración;',' no usarlo en zonas cerradas o mal ventiladas por los gases del motor; no inclinarlo más de lo permitido; NO ARRANCAR ante olor a GAS NATURAL O GLP; manos, pies, ropa y pelo fuera de las partes móviles y fuera de la zona de soplado; repostar en un lugar distinto al de trabajo y NUNCA ANTES DE DOS MINUTOS tras parar el motor; guantes siempre (cilindro y tubo de escape muy calientes); bajar la aceleración antes de…'),
('C046-0160','nclinarlo más de lo permitido;',' NO ARRANCAR ante olor a GAS NATURAL O GLP; manos, pies, ropa y pelo fuera de las partes móviles y fuera de la zona de soplado; repostar en un lugar distinto al de trabajo y NUNCA ANTES DE DOS MINUTOS tras parar el motor; guantes siempre (cilindro y tubo de escape muy calientes); bajar la aceleración antes de reubicarlo; no poner las petacas de combustible cerca; no arrancar sin filtro de aire o con palas dañadas;…'),
('C046-0165','ERAS HORAS, cambiar el aceite;',' cada 8 HORAS, controlar nivel de aceite y limpiar alrededor del tubo de escape, resortes y varillas; cada 25 HORAS, cambiar aceite y mantener el prefiltro; cada 50 HORAS, cambiar aceite y limpiar el filtro de carburante; cada 100 HORAS, mantenimiento del cartucho del filtro de aire y SUSTITUIR LA BUJÍA.'),
('C046-0166','e escape, resortes y varillas;',' cada 25 HORAS, cambiar aceite y mantener el prefiltro; cada 50 HORAS, cambiar aceite y limpiar el filtro de carburante; cada 100 HORAS, mantenimiento del cartucho del filtro de aire y SUSTITUIR LA BUJÍA.'),
('C046-0168','mpiar el filtro de carburante;',' cada 100 HORAS, mantenimiento del cartucho del filtro de aire y SUSTITUIR LA BUJÍA.'),
('C046-0169','ceite y mantener el prefiltro;',' cada 50 HORAS, cambiar aceite y limpiar el filtro de carburante; cada 100 HORAS, mantenimiento del cartucho del filtro de aire y SUSTITUIR LA BUJÍA.'),
('C046-0170','ERAS HORAS, cambiar el aceite;',' cada 8 HORAS, controlar nivel de aceite y limpiar alrededor del tubo de escape, resortes y varillas; cada 25 HORAS, cambiar aceite y mantener el prefiltro; cada 50 HORAS, cambiar aceite y limpiar el filtro de carburante; cada 100 HORAS, mantenimiento del cartucho del filtro de aire y SUSTITUIR LA BUJÍA.'),
('C046-0176','eleración antes de reubicarlo;',' no poner las petacas de combustible cerca; no arrancar sin filtro de aire o con palas dañadas; no usar repuestos ajenos al fabricante; quitar el cable de la bujía al manipularlo.'),
('C046-0193',' en los tendidos de mangueras;',' presión positiva.'),
('C046-0195','pulsar agua con mayor presión;',' útil para mandar agua a una punta de lanza situada a muchos metros de DESNIVEL POSITIVO, por ejemplo para surtir la COLUMNA SECA de un edificio de gran altura.'),
('C046-0245','onductor y comprobar el nivel;',' fijar verticalmente el tubo con el mechero, atornillar el anillo y abrir la ESPITA DE AIRE (si se abre demasiado sale más combustible del deseado y si se abre poco no sale).'),
('C046-0247',' regulando la válvula de aire;',' es recomendable hacer una PEQUEÑA PILA DE HOJARASCA, inclinar la antorcha para mojarla de combustible, ENCENDER PRIMERO LA PILA y acercar después el mechero.'),
('C046-0252',', que se deteriora con el uso;',' para renovarla se emplean retales de los dedos de guantes de NOMEX o KEVLAR, o de buzos ignifugados.'),
('C047-0021','A y la FARINGE, y consiste en:','
— HUMIDIFICACIÓN hasta saturarlo de vapor de agua. El aire saturado a 37 ºC contiene 44 g/m³ de agua; el aire de las BOTELLAS DEL ERA tiene un MÁXIMO DE 50 mg/m³. Ese aire tan seco obliga a aportarle mucha agua para no dañar los alvéolos.
— CALENTAMIENTO o ENFRIAMIENTO para aproximarlo a 37 ºC.
— LIMPIEZA de partículas en suspensión (polvo, contaminación).'),
('C047-0038','se estructura en CUATRO FASES:','
1) VENTILACIÓN PULMONAR (movimiento de entrada y salida de aire).
2) DIFUSIÓN de CO₂ y O₂ entre la atmósfera y los alvéolos.
3) TRANSPORTE de O₂ y CO₂ en sangre.
4) REGULACIÓN de la respiración y otros aspectos.'),
('C047-0041','ue movilizan la caja torácica:','
— INSPIRATORIOS: INTERCOSTALES EXTERNOS y DIAFRAGMA.
— ESPIRATORIOS: RECTOS ABDOMINALES e INTERCOSTALES INTERNOS (la figura añade oblicuos mayor y menor del abdomen).
En reposo la ESPIRACIÓN suele ser PASIVA: el trabajo principal lo hacen los inspiratorios. Al contraerse expanden la caja torácica, crean un vacío con PRESIÓN INFERIOR A LA ATMOSFÉRICA y provocan la entrada de aire.'),
('C047-0076',' crónicas, vía ERITROPOYETINA;',' si la globulia supera el 55-60 % hay hiperviscosidad e hipertensión— y cambios de AFINIDAD de la Hb).'),
('C047-0077',' crónicas, vía ERITROPOYETINA;',' si la globulia supera el 55-60 % hay hiperviscosidad e hipertensión— y cambios de AFINIDAD de la Hb).'),
('C047-0086',' crónicas, vía ERITROPOYETINA;',' si la globulia supera el 55-60 % hay hiperviscosidad e hipertensión— y cambios de AFINIDAD de la Hb).'),
('C047-0324','dependiente del aire ambiente:',' el aire llega según las necesidades del usuario desde una o varias BOTELLAS de aire comprimido, a través de un REDUCTOR DE PRESIÓN, una VÁLVULA DE REGULACIÓN A DEMANDA y un ADAPTADOR FACIAL.'),
('C047-0430','rizontal y correas extendidas;',' botella con la válvula hacia el volante del manorreductor; roscar a mano y colocar la CINTA ANTIVIBRACIONES en el volante; ajustar la correa de la botella y fijar el velcro; conectar el regulador a la manguera de media presión y comprobar.'),
('C047-0431',' la botella y fijar el velcro;',' conectar el regulador a la manguera de media presión y comprobar.'),
('C048-0150','INTA ANTIVIBRACIÓN en cada una','; ajustar el atalaje y activar el cierre hermético tirando de la correa.'),
('C048-0240','te sobre todo desde 9,0 mg/m³;',' se detecta antes en las mucosas de ojos, nariz y garganta; NO inflamable; neblinas AMARILLO VERDOSAS; olor PICANTE desde 0,3-0,9 mg/m³; irritación de mucosas desde 45 mg/m³; ≥ 150 mg/m³ muy peligroso aun en exposición corta; EDEMA PULMONAR, más rápido con trabajo fuerte, que puede manifestarse hasta DOS DÍAS después; hiperactividad bronquial; QUEMADURAS en la piel; CLORACNÉ en exposiciones largas a bajas…'),
('C048-0267','canismo PISTÓN-BIELA-CIGÜEÑAL;',' al bajar el pistón el vacío abre la VÁLVULA DE ADMISIÓN venciendo su resorte y mantiene cerrada la de salida; al subir, la admisión se cierra y la presión vence el muelle de la válvula de ESCAPE.'),
('C048-0322','cciones dibujadas en la bolsa;',' cargar sólo unidades conformes (fechas de revisión y marca del fabricante) y hasta la presión marcada en el cuello; exige entrenamiento.'),
('C048-0380','in; botellas de 200 o 300 bar;',' PRIMERA ETAPA de reducción de 200/300 bar A 5,5 BAR, precisa y regular.'),
('C048-0406','rcado), con DOS CLASES de ERA:',' TIPO 1 de uso INDUSTRIAL y TIPO 2 para BOMBEROS, que sólo deben conectarse a máscaras de CLASE 3.'),
('C048-0416','ara se ensucia con frecuencia:',' revisar el pulmo tras el uso, sobre todo en ambientes químicamente agresivos; si la membrana o las juntas están dañadas se sustituyen y se comprueban las presiones de apertura y cierre (empresa suministradora).'),
('C048-0419','ajo en ambientes contaminados:','
1.2.3 RIESGOS ATMOSFÉRICOS (de los más peligrosos; causa del mayor número de accidentes por asfixia, intoxicación, explosión): oxígeno < 19,5 % (DEFICIENCIA) o > 23,5 % (ENRIQUECIMIENTO); gases o vapores inflamables que exceden el 10 % de su LÍMITE INFERIOR DE INFLAMABILIDAD; tóxicos o contaminantes sobre el límite de exposición; polvos o neblinas que reducen la visión a MENOS DE 1,5 METROS; cualquier sustancia…'),
('C048-0431','— ÁCIDO SULFHÍDRICO (H₂S):',' incoloro, inflamable y explosivo en concentraciones altas; olor a HUEVOS PODRIDOS, pero la sensibilidad al olor desaparece pronto y no sirve de advertencia; alcantarillas, tratamiento de aguas, petroquímicas.'),
('C048-0433','— DIÓXIDO DE AZUFRE (SO₂):',' irritante, de la combustión de sulfuro o de lo que lo contenga (tanques con fugas, fumigación); de 1 a 10 ppm aumenta el pulso y la respiración y decrece la intensidad respiratoria; exposiciones repetidas a concentraciones moderadas, ASMA; desde 100 ppm, peligroso para la vida.'),
('C048-0442','1.2.5 RIESGOS BIOLÓGICOS:',' hongos, mohos, bacterias, virus o materia en descomposición (trabajos de desinfección).')) as v(id, cola, ext)
  where b.id = v.id and right(b.cita, 30) = v.cola and (b.editada_at is null or b.id = 'C001-0021')
  returning 1)
select 'lote 5: ' || count(*) || ' de 160 citas ampliadas' as resultado from u;
