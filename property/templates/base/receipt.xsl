
<!-- $Id: receipt.xsl 14719 2016-02-10 19:45:46Z sigurdne $ -->
<xsl:template name="receipt">
		<xsl:for-each select="message">
			<tr>
				<td class="th_text" colspan="2" align="left">
					<xsl:value-of select="msg"/>
				</td>
			</tr>
		</xsl:for-each>
		<xsl:for-each select="error">
			<tr>
				<td class="th_text" colspan="2" align="left">
					<xsl:value-of select="msg"/>
				</td>
			</tr>
		</xsl:for-each>
</xsl:template>
