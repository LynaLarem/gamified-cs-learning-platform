package gamified.gamified.Entities;

public class LevelUtils {

    public static Long getXpForNextLevel(int currentLevel) {
        // Implement logic to return the XP threshold for the next level
        if (currentLevel == 1) {
            return 100L;
        } else if (currentLevel == 2) {
            return 250L; // 100 + 150
        } else if (currentLevel >= 3 && currentLevel <= 9) {
            return 250L + 300L * (currentLevel - 2); // 250 + 300 * (level - 2)
        } else if (currentLevel >= 10 && currentLevel <= 19) {
            return 2350L + 400L * (currentLevel - 9); // 2350 + 400 * (level - 9)
        } else if (currentLevel >= 20 && currentLevel <= 49) {
            return 6350L + 500L * (currentLevel - 19); // 6350 + 500 * (level - 19)
        } else if (currentLevel >= 50 && currentLevel <= 99) {
            return 21350L + 700L * (currentLevel - 49); // 21350 + 700 * (level - 49)
        } else if (currentLevel >= 100 && currentLevel <= 299) {
            return 56350L + 850L * (currentLevel - 99); // 56350 + 850 * (level - 99)
        } else {
            return 232350L + 1000L * (currentLevel - 299); // 232350 + 1000 * (level - 299)
        }
    }

    public static int calculateLevel(long xp) {
        if (xp < 100) {
            return 1;
        } else if (xp < 250) { // 100 + 150
            return 2;
        } else if (xp < 550) { // 250 + 300
            return 3;
        } else if (xp < 850) { // 550 + 300
            return 4;
        } else if (xp < 1150) { // 850 + 300
            return 5;
        } else if (xp < 1450) { // 1150 + 300
            return 6;
        } else if (xp < 1750) { // 1450 + 300
            return 7;
        } else if (xp < 2050) { // 1750 + 300
            return 8;
        } else if (xp < 2350) { // 2050 + 300
            return 9;
        } else if (xp < 2750) { // 2350 + 400
            return 10;
        } else if (xp < 3150) { // 2750 + 400
            return 11;
        } else if (xp < 3550) { // 3150 + 400
            return 12;
        } else if (xp < 3950) { // 3550 + 400
            return 13;
        } else if (xp < 4350) { // 3950 + 400
            return 14;
        } else if (xp < 4750) { // 4350 + 400
            return 15;
        } else if (xp < 5150) { // 4750 + 400
            return 16;
        } else if (xp < 5550) { // 5150 + 400
            return 17;
        } else if (xp < 5950) { // 5550 + 400
            return 18;
        } else if (xp < 6350) { // 5950 + 400
            return 19;
        } else if (xp < 6850) { // 6350 + 500
            return 20;
        } else if (xp < 7350) { // 6850 + 500
            return 21;
        } else if (xp < 7850) { // 7350 + 500
            return 22;
        } else if (xp < 8350) { // 7850 + 500
            return 23;
        } else if (xp < 8850) { // 8350 + 500
            return 24;
        } else if (xp < 9350) { // 8850 + 500
            return 25;
        } else if (xp < 9850) { // 9350 + 500
            return 26;
        } else if (xp < 10350) { // 9850 + 500
            return 27;
        } else if (xp < 10850) { // 10350 + 500
            return 28;
        } else if (xp < 11350) { // 10850 + 500
            return 29;
        } else if (xp < 11850) { // 11350 + 500
            return 30;
        } else if (xp < 12350) { // 11850 + 500
            return 31;
        } else if (xp < 12850) { // 12350 + 500
            return 32;
        } else if (xp < 13350) { // 12850 + 500
            return 33;
        } else if (xp < 13850) { // 13350 + 500
            return 34;
        } else if (xp < 14350) { // 13850 + 500
            return 35;
        } else if (xp < 14850) { // 14350 + 500
            return 36;
        } else if (xp < 15350) { // 14850 + 500
            return 37;
        } else if (xp < 15850) { // 15350 + 500
            return 38;
        } else if (xp < 16350) { // 15850 + 500
            return 39;
        } else if (xp < 16850) { // 16350 + 500
            return 40;
        } else if (xp < 17350) { // 16850 + 500
            return 41;
        } else if (xp < 17850) { // 17350 + 500
            return 42;
        } else if (xp < 18350) { // 17850 + 500
            return 43;
        } else if (xp < 18850) { // 18350 + 500
            return 44;
        } else if (xp < 19350) { // 18850 + 500
            return 45;
        } else if (xp < 19850) { // 19350 + 500
            return 46;
        } else if (xp < 20350) { // 19850 + 500
            return 47;
        } else if (xp < 20850) { // 20350 + 500
            return 48;
        } else if (xp < 21350) { // 20850 + 500
            return 49;
        } else if (xp < 22050) { // 21350 + 700
            return 50;
        } else if (xp < 22750) { // 22050 + 700
            return 51;
        } else if (xp < 23450) { // 22750 + 700
            return 52;
        } else if (xp < 24150) { // 23450 + 700
            return 53;
        } else if (xp < 24850) { // 24150 + 700
            return 54;
        } else if (xp < 25550) { // 24850 + 700
            return 55;
        } else if (xp < 26250) { // 25550 + 700
            return 56;
        } else if (xp < 26950) { // 26250 + 700
            return 57;
        } else if (xp < 27650) { // 26950 + 700
            return 58;
        } else if (xp < 28350) { // 27650 + 700
            return 59;
        } else if (xp < 29050) { // 28350 + 700
            return 60;
        } else if (xp < 29750) { // 29050 + 700
            return 61;
        } else if (xp < 30450) { // 29750 + 700
            return 62;
        } else if (xp < 31150) { // 30450 + 700
            return 63;
        } else if (xp < 31850) { // 31150 + 700
            return 64;
        } else if (xp < 32550) { // 31850 + 700
            return 65;
        } else if (xp < 33250) { // 32550 + 700
            return 66;
        } else if (xp < 33950) { // 33250 + 700
            return 67;
        } else if (xp < 34650) { // 33950 + 700
            return 68;
        } else if (xp < 35350) { // 34650 + 700
            return 69;
        } else if (xp < 36050) { // 35350 + 700
            return 70;
        } else if (xp < 36750) { // 36050 + 700
            return 71;
        } else if (xp < 37450) { // 36750 + 700
            return 72;
        } else if (xp < 38150) { // 37450 + 700
            return 73;
        } else if (xp < 38850) { // 38150 + 700
            return 74;
        } else if (xp < 39550) { // 38850 + 700
            return 75;
        } else if (xp < 40250) { // 39550 + 700
            return 76;
        } else if (xp < 40950) { // 40250 + 700
            return 77;
        } else if (xp < 41650) { // 40950 + 700
            return 78;
        } else if (xp < 42350) { // 41650 + 700
            return 79;
        } else if (xp < 43050) { // 42350 + 700
            return 80;
        } else if (xp < 43750) { // 43050 + 700
            return 81;
        } else if (xp < 44450) { // 43750 + 700
            return 82;
        } else if (xp < 45150) { // 44450 + 700
            return 83;
        } else if (xp < 45850) { // 45150 + 700
            return 84;
        } else if (xp < 46550) { // 45850 + 700
            return 85;
        } else if (xp < 47250) { // 46550 + 700
            return 86;
        } else if (xp < 47950) { // 47250 + 700
            return 87;
        } else if (xp < 48650) { // 47950 + 700
            return 88;
        } else if (xp < 49350) { // 48650 + 700
            return 89;
        } else if (xp < 50050) { // 49350 + 700
            return 90;
        } else if (xp < 50750) { // 50050 + 700
            return 91;
        } else if (xp < 51450) { // 50750 + 700
            return 92;
        } else if (xp < 52150) { // 51450 + 700
            return 93;
        } else if (xp < 52850) { // 52150 + 700
            return 94;
        } else if (xp < 53550) { // 52850 + 700
            return 95;
        } else if (xp < 54250) { // 53550 + 700
            return 96;
        } else if (xp < 54950) { // 54250 + 700
            return 97;
        } else if (xp < 55650) { // 54950 + 700
            return 98;
        } else if (xp < 56350) { // 55650 + 700
            return 99;
        } else if (xp < 64850) { // 56350 + 850
            return 100;
        } else if (xp < 73350) { // 64850 + 850
            return 101;
        } else if (xp < 81850) { // 73350 + 850
            return 102;
        } else if (xp < 90350) { // 81850 + 850
            return 103;
        } else if (xp < 98850) { // 90350 + 850
            return 104;
        } else if (xp < 107350) { // 98850 + 850
            return 105;
        } else if (xp < 115850) { // 107350 + 850
            return 106;
        } else if (xp < 124350) { // 115850 + 850
            return 107;
        } else if (xp < 132850) { // 124350 + 850
            return 108;
        } else if (xp < 141350) { // 132850 + 850
            return 109;
        } else if (xp < 149850) { // 141350 + 850
            return 110;
        } else if (xp < 158350) { // 149850 + 850
            return 111;
        } else if (xp < 166850) { // 158350 + 850
            return 112;
        } else if (xp < 175350) { // 166850 + 850
            return 113;
        } else if (xp < 183850) { // 175350 + 850
            return 114;
        } else if (xp < 192350) { // 183850 + 850
            return 115;
        } else if (xp < 200850) { // 192350 + 850
            return 116;
        } else if (xp < 209350) { // 200850 + 850
            return 117;
        } else if (xp < 217850) { // 209350 + 850
            return 118;
        } else if (xp < 226350) { // 217850 + 850
            return 119;
        } else if (xp < 234850) { // 226350 + 850
            return 120;
        } else if (xp < 243350) { // 234850 + 850
            return 121;
        } else if (xp < 251850) { // 243350 + 850
            return 122;
        } else if (xp < 260350) { // 251850 + 850
            return 123;
        } else if (xp < 268850) { // 260350 + 850
            return 124;
        } else if (xp < 277350) { // 268850 + 850
            return 125;
        } else if (xp < 285850) { // 277350 + 850
            return 126;
        } else if (xp < 294350) { // 285850 + 850
            return 127;
        } else if (xp < 302850) { // 294350 + 850
            return 128;
        } else if (xp < 311350) { // 302850 + 850
            return 129;
        } else if (xp < 319850) { // 311350 + 850
            return 130;
        } else if (xp < 328350) { // 319850 + 850
            return 131;
        } else if (xp < 336850) { // 328350 + 850
            return 132;
        } else if (xp < 345350) { // 336850 + 850
            return 133;
        } else if (xp < 353850) { // 345350 + 850
            return 134;
        } else if (xp < 362350) { // 353850 + 850
            return 135;
        } else if (xp < 370850) { // 362350 + 850
            return 136;
        } else if (xp < 379350) { // 370850 + 850
            return 137;
        } else if (xp < 387850) { // 379350 + 850
            return 138;
        } else if (xp < 396350) { // 387850 + 850
            return 139;
        } else if (xp < 404850) { // 396350 + 850
            return 140;
        } else if (xp < 413350) { // 404850 + 850
            return 141;
        } else if (xp < 421850) { // 413350 + 850
            return 142;
        } else if (xp < 430350) { // 421850 + 850
            return 143;
        } else if (xp < 438850) { // 430350 + 850
            return 144;
        } else if (xp < 447350) { // 438850 + 850
            return 145;
        } else if (xp < 455850) { // 447350 + 850
            return 146;
        } else if (xp < 464350) { // 455850 + 850
            return 147;
        } else if (xp < 472850) { // 464350 + 850
            return 148;
        } else if (xp < 481350) { // 472850 + 850
            return 149;
        } else if (xp < 489850) { // 481350 + 850
            return 150;
        } else if (xp < 499850) { // 489850 + 1000
            return 151;
        } else if (xp < 509850) { // 499850 + 1000
            return 152;
        } else if (xp < 519850) { // 509850 + 1000
            return 153;
        } else if (xp < 529850) { // 519850 + 1000
            return 154;
        } else if (xp < 539850) { // 529850 + 1000
            return 155;
        } else if (xp < 549850) { // 539850 + 1000
            return 156;
        } else if (xp < 559850) { // 549850 + 1000
            return 157;
        }else if (xp < 171150) {
            return 158;
        } else if (xp < 172950) {
            return 159;
        } else if (xp < 174750) {
            return 160;
        } else if (xp < 176550) {
            return 161;
        } else if (xp < 178350) {
            return 162;
        } else if (xp < 180150) {
            return 163;
        } else if (xp < 181950) {
            return 164;
        } else if (xp < 183750) {
            return 165;
        } else if (xp < 185550) {
            return 166;
        } else if (xp < 187350) {
            return 167;
        } else if (xp < 189150) {
            return 168;
        } else if (xp < 190950) {
            return 169;
        } else if (xp < 192750) {
            return 170;
        } else if (xp < 194550) {
            return 171;
        } else if (xp < 196350) {
            return 172;
        } else if (xp < 198150) {
            return 173;
        } else if (xp < 199950) {
            return 174;
        } else if (xp < 201750) {
            return 175;
        } else if (xp < 203550) {
            return 176;
        } else if (xp < 205350) {
            return 177;
        } else if (xp < 207150) {
            return 178;
        } else if (xp < 208950) {
            return 179;
        } else if (xp < 210750) {
            return 180;
        } else if (xp < 212550) {
            return 181;
        } else if (xp < 214350) {
            return 182;
        } else if (xp < 216150) {
            return 183;
        } else if (xp < 217950) {
            return 184;
        } else if (xp < 219750) {
            return 185;
        } else if (xp < 221550) {
            return 186;
        } else if (xp < 223350) {
            return 187;
        } else if (xp < 225150) {
            return 188;
        } else if (xp < 226950) {
            return 189;
        } else if (xp < 228750) {
            return 190;
        } else if (xp < 230550) {
            return 191;
        } else if (xp < 232350) {
            return 192;
        } else if (xp < 234150) {
            return 193;
        } else if (xp < 235950) {
            return 194;
        } else if (xp < 237750) {
            return 195;
        } else if (xp < 239550) {
            return 196;
        } else if (xp < 241350) {
            return 197;
        } else if (xp < 243150) {
            return 198;
        } else if (xp < 244950) {
            return 199;
        } else if (xp < 246750) {
            return 200;
        } else if (xp < 248550) {
            return 201;
        } else if (xp < 250350) {
            return 202;
        } else if (xp < 252150) {
            return 203;
        } else if (xp < 253950) {
            return 204;
        } else if (xp < 255750) {
            return 205;
        } else if (xp < 257550) {
            return 206;
        } else if (xp < 259350) {
            return 207;
        } else if (xp < 261150) {
            return 208;
        } else if (xp < 262950) {
            return 209;
        } else if (xp < 264750) {
            return 210;
        } else if (xp < 266550) {
            return 211;
        } else if (xp < 268350) {
            return 212;
        } else if (xp < 270150) {
            return 213;
        } else if (xp < 271950) {
            return 214;
        } else if (xp < 273750) {
            return 215;
        } else if (xp < 275550) {
            return 216;
        } else if (xp < 277350) {
            return 217;
        } else if (xp < 279150) {
            return 218;
        } else if (xp < 280950) {
            return 219;
        } else if (xp < 282750) {
            return 220;
        } else if (xp < 284550) {
            return 221;
        } else if (xp < 286350) {
            return 222;
        } else if (xp < 288150) {
            return 223;
        } else if (xp < 289950) {
            return 224;
        } else if (xp < 291750) {
            return 225;
        } else if (xp < 293550) {
            return 226;
        } else if (xp < 295350) {
            return 227;
        } else if (xp < 297150) {
            return 228;
        } else if (xp < 298950) {
            return 229;
        } else if (xp < 300750) {
            return 230;
        } else if (xp < 302550) {
            return 231;
        } else if (xp < 304350) {
            return 232;
        } else if (xp < 306150) {
            return 233;
        } else if (xp < 307950) {
            return 234;
        } else if (xp < 309750) {
            return 235;
        } else if (xp < 311550) {
            return 236;
        } else if (xp < 313350) {
            return 237;
        } else if (xp < 315150) {
            return 238;
        } else if (xp < 316950) {
            return 239;
        } else if (xp < 318750) {
            return 240;
        } else if (xp < 320550) {
            return 241;
        } else if (xp < 322350) {
            return 242;
        } else if (xp < 324150) {
            return 243;
        } else if (xp < 325950) {
            return 244;
        } else if (xp < 327750) {
            return 245;
        } else if (xp < 329550) {
            return 246;
        } else if (xp < 331350) {
            return 247;
        } else if (xp < 333150) {
            return 248;
        } else if (xp < 334950) {
            return 249;
        } else if (xp < 336750) {
            return 250;
        } else if (xp < 338550) {
            return 251;
        } else if (xp < 340350) {
            return 252;
        } else if (xp < 342150) {
            return 253;
        } else if (xp < 343950) {
            return 254;
        } else if (xp < 345750) {
            return 255;
        } else if (xp < 347550) {
            return 256;
        } else if (xp < 349350) {
            return 257;
        } else if (xp < 351150) {
            return 258;
        } else if (xp < 352950) {
            return 259;
        } else if (xp < 354750) {
            return 260;
        } else if (xp < 356550) {
            return 261;
        } else if (xp < 358350) {
            return 262;
        } else if (xp < 360150) {
            return 263;
        } else if (xp < 361950) {
            return 264;
        } else if (xp < 363750) {
            return 265;
        } else if (xp < 365550) {
            return 266;
        } else if (xp < 367350) {
            return 267;
        } else if (xp < 369150) {
            return 268;
        } else if (xp < 370950) {
            return 269;
        } else if (xp < 372750) {
            return 270;
        } else if (xp < 374550) {
            return 271;
        } else if (xp < 376350) {
            return 272;
        } else if (xp < 378150) {
            return 273;
        } else if (xp < 379950) {
            return 274;
        } else if (xp < 381750) {
            return 275;
        } else if (xp < 383550) {
            return 276;
        } else if (xp < 385350) {
            return 277;
        } else if (xp < 387150) {
            return 278;
        } else if (xp < 388950) {
            return 279;
        } else if (xp < 390750) {
            return 280;
        } else if (xp < 392550) {
            return 281;
        } else if (xp < 394350) {
            return 282;
        } else if (xp < 396150) {
            return 283;
        } else if (xp < 397950) {
            return 284;
        } else if (xp < 399750) {
            return 285;
        } else if (xp < 401550) {
            return 286;
        } else if (xp < 403350) {
            return 287;
        } else if (xp < 405150) {
            return 288;
        } else if (xp < 406950) {
            return 289;
        } else if (xp < 408750) {
            return 290;
        } else if (xp < 410550) {
            return 291;
        } else if (xp < 412350) {
            return 292;
        } else if (xp < 414150) {
            return 293;
        } else if (xp < 415950) {
            return 294;
        } else if (xp < 417750) {
            return 295;
        } else if (xp < 419550) {
            return 296;
        } else if (xp < 421350) {
            return 297;
        } else if (xp < 423150) {
            return 298;
        } else if (xp < 424950) {
            return 299;
        } else if (xp < 426750) {
            return 300;
        } else if (xp < 428550) {
            return 301;
        } else if (xp < 430350) {
            return 302;
        } else if (xp < 432150) {
            return 303;
        } else if (xp < 433950) {
            return 304;
        } else if (xp < 435750) {
            return 305;
        } else if (xp < 437550) {
            return 306;
        } else if (xp < 439350) {
            return 307;
        } else if (xp < 441150) {
            return 308;
        } else if (xp < 442950) {
            return 309;
        } else if (xp < 444750) {
            return 310;
        }

        return 310;
    }
}