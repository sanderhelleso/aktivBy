<!-- $Id: control_group_tabs.xsl 16916 2017-07-06 12:04:43Z sigurdne $ -->
<!-- separate tabs and  inline tables-->

<xsl:template match="data" xmlns:php="http://php.net/xsl">
	<div id="control_group_tabview">
	
		<xsl:value-of disable-output-escaping="yes" select="tabs" />
		<div>
			<div id="control_group">
				<xsl:call-template name="control_group" />
			</div>
			<div id="control_items">
				<xsl:call-template name="control_group_items" />
			</div>
		</div>
	</div>
</xsl:template>
