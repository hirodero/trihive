import { NextResponse } from "next/server";
import {query} from '../../../app/lib/db'
export async function POST(req) {
    try {
      const { judulArtikel, kategoriArtikel, isiArtikel, deskripsiArtikel, gambarArtikel, Trivia } = await req.json();
      const result = await query(
        `INSERT INTO artikel (ArticleTitle, ArticleCategory, ArticleContent, ArticleDescription, ArticleImage, Trivia)
        OUTPUT INSERTED.id
        VALUES (@param0, @param1, @param2, @param3, @param4, @param5)`,
        [
          judulArtikel,
          kategoriArtikel,
          isiArtikel,
          deskripsiArtikel,
          gambarArtikel,
          Trivia ]
      );
      
      const insertId = result[0]?.id;
      const articleId = "ART" + insertId.toString().padStart(3, "0");
      
      await query(
        `UPDATE artikel SET ArticleID = @param0 WHERE id = @param1`,
        [articleId, insertId]
      );
      
      return NextResponse.json({
        success: true,
        message: 'Artikel berhasil ditambahkan',
        id: articleId,
      });
      
    } catch (e) {
      console.error("ERROR INSERT:", e);
      return NextResponse.json(
        { success: false, message: 'Gagal insert data', error: e.message },
        { status: 500 }
      );
    }
  }
  
